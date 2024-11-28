import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import axios from 'axios';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 5px;
  border-radius: 6px;
  border: ${(props) => (props.error ? "2px solid #f32525" : "1px solid #ddd")};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  width: 250px;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding: 0 20px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.span`
  font-size: 0.8rem;
  color: #f32525;
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: #28a745;
  font-size: 1rem;
  margin-top: 15px;
`;

const StyledIcon = styled(IoClose)`
  position: relative;
  left: 80px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #f32525;
  }
`;

function ProductForm({ onClose, onProductAdded, product }) {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [stock, setStock] = useState(product?.stock || '');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome do produto é obrigatório.';
    if (!description) newErrors.description = 'Categoria é obrigatória.';
    if (!price || isNaN(price) || parseFloat(price) <= 0) newErrors.price = 'Insira um preço válido.';
    if (!stock || isNaN(stock) || parseInt(stock, 10) <= 0) newErrors.stock = 'Insira uma quantidade válida.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };
  
    try {
      if (product) {
        await axios.put(`http://localhost:3000/v1/product/${product.id}`, updatedProduct);
        setSuccessMessage('Produto atualizado com sucesso!');
        onProductAdded();
  
        setTimeout(() => {
          onClose();
        }, 1000); 
      } else {
        
        await axios.post('http://localhost:3000/v1/product', updatedProduct);
        setSuccessMessage('Produto criado com sucesso!');
  
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setErrors({});
        onProductAdded();
  
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); 
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setSuccessMessage('');
    }
  };
  

  return (
    <ModalOverlay>
      <FormContainer>
        <FormHeader>
          <span>Cadastrar Produto</span>
          <StyledIcon onClick={onClose} />
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nome do Produto</Label>
            <Input
              type="text"
              value={name}
              placeholder="Ex: Computador"
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Categoria</Label>
            <Input
              type="text"
              value={description}
              placeholder="Ex: Eletrônico"
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Preço</Label>
            <Input
              type="number"
              step="0.01"
              value={price}
              placeholder="Digite um valor"
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Quantidade em Estoque</Label>
            <Input
              type="number"
              value={stock}
              placeholder="Disponível em estoque"
              onChange={(e) => setStock(e.target.value)}
            />
            {errors.stock && <ErrorMessage>{errors.stock}</ErrorMessage>}
          </FormGroup>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          <Button type="submit">Salvar Produto</Button>
        </form>
      </FormContainer>
    </ModalOverlay>
  );
}

export default ProductForm;
