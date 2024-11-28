import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductForm from '../../Components/ProductForm';
import Layout from '../Layout/Layout';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  color: #333;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const ProductRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ProductCell = styled.td`
  padding: 10px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const Button = styled.a`
  padding: 10px 10px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border-radius: 18px;
  text-decoration: none;
  font-size: 0.7em;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.6em;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.5em;
  }
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  max-width: 500px;
  width: 90%; 
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 90%; 
  }
`;


const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #999;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/v1/product/search');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setProductToEdit(null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setProductToEdit(null);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product); 
    setModalVisible(true); 
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/v1/product/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <Header>
          Produtos Cadastrados{' '}
          <Button onClick={handleAddProduct}>Cadastrar Produto</Button>
        </Header>

        {products.length === 0 ? (
          <EmptyMessage>Nenhum produto cadastrado</EmptyMessage>
        ) : (
          <ProductTable>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow key={product.id}>
                  <ProductCell>{product.description}</ProductCell>
                  <ProductCell>{product.name}</ProductCell>
                  <ProductCell>{product.stock}</ProductCell>
                  <ProductCell>R$ {product.price.toFixed(2)}</ProductCell>
                  <ProductCell>
                  <Button onClick={() => handleEditProduct(product)}>Editar</Button>
                    <Button onClick={() => handleRemove(product.id)}>Remover</Button>
                  </ProductCell>
                </ProductRow>
              ))}
            </tbody>
          </ProductTable>
        )}

        {isModalVisible && (
          <ModalOverlay onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ProductForm 
              onClose={handleCloseModal} 
              onProductAdded={fetchProducts}
              product={productToEdit}
              />
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </Layout>
  );
}

export default ProductList;