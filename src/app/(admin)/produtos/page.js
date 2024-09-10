'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '@/app/components/Modal';
import { FaTrashCan } from "react-icons/fa6";
import AddCategory from '@/app/components/AddCategory';
import AddProduct from '@/app/components/AddProduct';
import { api } from '@/app/services/api';

function Page() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the productId to delete
  const userId = Cookies.get('userId');

  const handleOpen = (productId) => {
    setSelectedProductId(productId); // Set the selected productId when opening the modal
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProductId(null); // Clear the selected productId when closing the modal
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
    if (userId) {
      try {
        const userIdNumber = parseInt(userId, 10);
        const response = await api.get("/products", { params: { userId: userIdNumber } });
        setProducts(response.data);

        const grouped = response.data.reduce((acc, product) => {
          if (!acc[product.category.id]) {
            acc[product.category.id] = {
              category: product.category,
              products: []
            };
          }
          acc[product.category.id].products.push(product);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const excluirProduct = async () => {
    try {
      await api.delete(`/products/${selectedProductId}`); // Use the selectedProductId to delete the product
      fetchProducts(); // Re-fetch products after deletion
      handleClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className='bg-gray-200 min-h-full w-full px-10 py-5'>
      <Modal show={showModal} handleClose={handleClose}>
        <div className='flex flex-col p-5 gap-4'>
          <p className='text-black font-bold text-lg'>Excluir produto?</p>
          <div className='flex gap-4'>
            <button className='h-7 w-16 bg-gray-300 text-black' onClick={excluirProduct}>Sim</button>
            <button className='h-7 w-16 bg-gray-300 text-black' onClick={handleClose}>Não</button>
          </div>
        </div>
      </Modal>

      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <h1 className='text-black text-3xl font-bold font-light'>Produtos</h1>
          <div className='flex gap-5'>
            <AddProduct categories={categories} fetchProducts={fetchProducts} />
            <AddCategory />
          </div>
        </div>

        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className='bg-white border-gray-300 border w-full h-auto rounded-md mt-10 p-5 flex flex-col'>
              <p className='text-black text-xl font-light'>{category.category}</p>
              <div className='mt-5 flex flex-wrap gap-5'>
                {groupedProducts[category.id]?.products.length > 0 ? (
                  groupedProducts[category.id].products.map(product => (
                    <div key={product.productId} className='bg-gray-100 w-full sm:w-52 flex flex-col border-gray-300 border p-3 rounded-md relative'>
                      <div 
                        className='bg-white w-10 h-10 rounded-full absolute top-5 right-2 transform translate-x-2 translate-y-[-50%] flex justify-center items-center text-black  text-lg cursor-pointer' 
                        onClick={() => handleOpen(product.productId)} // Pass productId when opening modal
                      >
                        <FaTrashCan />
                      </div>
                      <div className='flex flex-col'>
                        <img src={product.path} alt={product.name} className="w-full h-40 object-cover" />
                        <p className='text-black text-lg mt-2'>{product.name}</p>
                        <p className='text-black text-md'>R$ {product.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-black text-md mt-2'>No products found for this category</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
