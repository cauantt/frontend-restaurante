import React, { useState } from 'react';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { api } from '../services/api';

function AddProduct({ categories }) {
  const userId = Cookies.get("userId");

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');  // this will store categoryId now
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const newProduct = async (e) => {
    e.preventDefault();

    try {
      console.log("Categoria selecionada:", category); // Verificar valor da categoria
      console.log("Nome do produto:", name); // Verificar nome
      console.log("Preço:", price); // Verificar preço
      console.log("User ID:", userId); // Verificar userId

      const response = await api.post("/products", {
        name: name,
        price: price,
        categoryId: category, // sending categoryId instead of category name
        userId: userId,
      });

      setSuccessMessage('Produto criado com sucesso!'); // Set success message
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error(error);
      setErrorMessage('Ocorreu um erro ao criar o produto.'); // Set error message
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSuccessMessage(''); // Clear success message when modal is closed
    setErrorMessage(''); // Clear error message when modal is closed
  };

  return (
    <div className='cursor-pointer flex w-36 h-10 bg-purple-700 rounded-md justify-between px-3 items-center text-center' onClick={handleOpen}>
      <Modal show={showModal} handleClose={handleClose}>
        <form onSubmit={newProduct} className='flex flex-col items-start gap-5 text-black'>
          <h1 className='text-black'>Criar produto</h1>
          <div>
            <p>Nome do produto</p>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              className='border border-black'
              value={name}
            />
          </div>

          <select
            name="Categorias"
            onChange={(e) => setCategory(e.target.value)} // updates categoryId
            id="Categorias"
              // use the categoryId as value
          >
            <option value="">Selecione uma categoria</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id} className='bg-white text-black'>
                  {category.category} 
                </option>
              ))
            ) : (
              <p className='text-black text-lg mt-10'>No categories found</p>
            )}
          </select>

          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder='preço'
            className='border border-black'
            value={price}
          />
          <button className="bg-black text-white h-10 w-20" type='submit'>Salvar</button>
        </form>

        {successMessage && <p className='text-green-500 mt-2'>{successMessage}</p>}
        {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
      </Modal>

      <p className='text-xl'>+</p>
      <p className='text-xs'>Adicionar Produto</p>
    </div>
  );
}

export default AddProduct;
