'use client';
import AddCategory from '@/app/components/AddCategory';
import AddProduct from '@/app/components/AddProduct';
import { api } from '@/app/services/api';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '@/app/components/Modal';

function Page() {


  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const userId = Cookies.get('userId');

  useEffect(() => {
    // Buscar categorias uma vez quando o componente for montado
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        console.log("Categories fetched: ", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);



  useEffect(() => {
    // Buscar produtos assim que o componente for montado
    

    fetchProducts();
  }, [userId]);

  const fetchProducts = async () => {
      if (userId) {
        try {
          const userIdNumber = parseInt(userId, 10);
          
          console.log("Fetching products for userId:", userIdNumber);
          
          const response = await api.get("/products", {
            params: {
              userId: userIdNumber,
            }
          });
          
          console.log("Products fetched:", response.data);
          setProducts(response.data);

          // Agrupar produtos por categoria
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
      } else {
        console.log("UserId is missing.");
      }
    };

  console.log("Grouped Products:", groupedProducts); // Verificar os produtos agrupados

  
  
  return (
    <div className='bg-gray-200 min-h-full w-full px-10 py-5'>
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
                  <div key={product.productId} className='bg-gray-100 w-full sm:w-52 flex flex-col justify-between border-gray-300 border p-3 rounded-md'>
                    <div className='flex flex-col '>
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
        <p className='text-black text-lg mt-10'>No categories found</p>
      )}
    </div>
  </div>
  );
}

export default Page;





