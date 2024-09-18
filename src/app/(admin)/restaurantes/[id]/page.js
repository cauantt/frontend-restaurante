'use client'

import { useEffect, useState } from 'react';
import { api } from '@/app/services/api'; // Ajuste o caminho conforme necessário
import Image from 'next/image';
import { notFound } from 'next/navigation'; // Para lidar com ID não encontrado

function RestaurantPage({ params }) {
  const { id } = params; // Obtém o ID da URL dinâmicamente
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Falha ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchCategories();
    }
  }, [user]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  if (!user.userId) {
    notFound(); // Redireciona para a página 404 se o restaurante não for encontrado
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        params: { userId: id },
      });
      setProducts(response.data);

      const grouped = response.data.reduce((acc, product) => {
        if (!acc[product.category.id]) {
          acc[product.category.id] = {
            category: product.category,
            products: [],
          };
        }
        acc[product.category.id].products.push(product);
        return acc;
      }, {});
      setGroupedProducts(grouped);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories", {
        params: { userId: id }
      });
      console.log(id)
      console.log("response", response)
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-center">
        <Image className='rounded-full' src={user.path} width={80} height={80} alt={user.enterprise} />

        <h1 className='font-semibold text-2xl text-black'>{user.enterprise} Catalão Centro</h1>
      </div>

      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.id}
            className="bg-white relative border-gray-300 border w-full h-auto rounded-lg mt-5 p-5 flex flex-col"
          >
            <p className="text-black text-xl font-light">
              {category.category}
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              {groupedProducts[category.id]?.products.length > 0 ? (
                groupedProducts[category.id].products.map((product) => (
                  <div
                    key={product.productId}
                    className="bg-gray-50 w-full sm:w-52 flex flex-col border-gray-300 border p-3 rounded-lg relative"
                  >
                    <div className="flex flex-col">
                      <img
                        src={product.path}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <p className="text-black text-lg mt-2">
                        {product.name}
                      </p>
                      <p className="text-black text-md">R$ {product.price}</p>
                      
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-black text-md mt-2">
                  No products found for this category
                </p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
}

export default RestaurantPage;
