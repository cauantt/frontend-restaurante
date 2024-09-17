'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/services/api'; // Ajuste o caminho conforme necessário

function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar e filtrar os usuários
    const fetchUsers = async () => {
      try {
        // Espera pela resposta da API
        const response = await api.get("users");
        // Filtra os usuários com role = 3
        const filteredUsers = response.data.filter(user => user.role === 3);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col'>

      <h2 className="text-black text-3xl">Restaurantes</h2>


      

      <div className="mt-14  bg-white p-3 rounded-lg flex flex-row gap-5 text flex-wrap ">

      <div className='bg-black w-24 h-24 '></div>


      <div className="max-w-80 flex  rounded-lg">

   

    <p className="text-gray-700 text-sm font-medium whitespace-nowrap overflow-hidden truncate">
      Restaurante Flow - Lanches e Grelhados 
    </p>
  </div>

















      </div>







    </div>
  );
}

export default Page;
