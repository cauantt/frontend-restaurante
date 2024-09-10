import React, { useState } from 'react';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { api } from '../services/api';

function AddProduct({ categories, fetchProducts }) {
  const userId = Cookies.get("userId");

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState(''); // Armazena categoryId
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Armazena objeto do arquivo
  const [product, setProduct] = useState(null); // Armazena ID do produto
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  

  const fetchProductImage = async (file, productId) => {
    try {

      console.log('produto',productId);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);

      const response = await api.post('/upload/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('URL da Imagem:', response.data.fileUrl);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error.message);
      setErrorMessage('Erro ao enviar imagem');
    }
  };

  const newProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/products", {
        name,
        price,
        categoryId: category, // Enviando categoryId
        userId,
      });

      const data = response.data;
      const createdProductId = data.productId; // Define o ID do produto criado

      // Atualiza o ID do produto
      setProduct(createdProductId); 

      setSuccessMessage('Produto criado com sucesso!');
      setErrorMessage('');
   
      // Envia a imagem após criar o produto
      if (image) {
        await fetchProductImage(image, createdProductId);
      }

      fetchProducts(); 
      
      // Limpar os estados
      setName('');
      setPrice('');
      setCategory('');
      setImage(null);
      setProduct(null);
    } catch (error) {
      console.error(error);
      setErrorMessage('Ocorreu um erro ao criar o produto.');
      setSuccessMessage('');
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSuccessMessage(''); // Limpa a mensagem de sucesso quando o modal é fechado
    setErrorMessage(''); // Limpa a mensagem de erro quando o modal é fechado
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
            onChange={(e) => setCategory(e.target.value)} // Atualiza categoryId
            id="Categorias"
          >
            <option value="">Selecione uma categoria</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id} className='bg-white text-black'>
                  {category.category}
                </option>
              ))
            ) : (
              <p className='text-black text-lg mt-10'>Nenhuma categoria encontrada</p>
            )}
          </select>

          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder='preço'
            className='border border-black'
            value={price}
          />

          <input
            onChange={(e) => setImage(e.target.files[0])} // Armazena o arquivo selecionado
            type="file"
            className='border border-black'
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
