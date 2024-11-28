import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../../assets/logo.jpg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #eff9ff;

  @media (min-width: 500px) {
    padding: 0;
  }
`;

const Background = styled.div`
  position: fixed;
  top: -50vmin;
  left: -50vmin;
  width: 100vmin;
  height: 100vmin;
  border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%;
  background: #65c8ff;

  &::after {
    content: '';
    position: inherit;
    right: -50vmin;
    bottom: -55vmin;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: #143d81;
  }
`;

const Card = styled.div`
  overflow: hidden;
  position: relative;
  z-index: 3;
  width: 94%;
  max-width: 360px;
  max-height: 400px;
  margin: 20px;
  padding: 130px 30px 54px;
  border-radius: 24px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 100px 100px rgb(0 0 0 / 10%);

  @media (min-width: 500px) {
    margin: 0;
    width: 360px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -880px;
    left: 50%;
    transform: translateX(-50%);
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background: #216ce7;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50% 50% 50% 50% ;
  width: 220px;
  height: 140px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 400;
  margin: 0 0 5px;
  color: rgba(0, 0, 0, 0.38);
`;

const Form = styled.form`
   margin: 0 0 44px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center; 
`;

const Input = styled.input`
  width: 100%;
  max-width: 320px; 
  height: 56px;
  border-radius: 28px;
  font-size: 16px;
  font-family: inherit;
  border: 0;
  padding: 0 24px;  
  color: #222222;
  background: #ededed;

  &::placeholder {
    color: rgba(0, 0, 0, 0.28);
  }
`;

export const Error = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: -6px;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
  max-width: 320px;
`;

const Button = styled.button`
  width: 50%;
  max-width: 400px; 
  height: 40px;
  border-radius: 28px;
  font-size: 18px;
  font-family: inherit;
  font-weight: 500;
  color: #f9f9f9;
  background: #226ce7;
  border: none;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.3s, transform 0.2s; 

  &:hover {
    background: #1a56b3; 
    transform: scale(1.05);
  }

  &:disabled {
    background: #9ec2f7;
    cursor: not-allowed;
  }
`;

const Footer = styled.footer`
  color: #a1a1a1;
  position: relative;
  bottom: 35px;

  a {
    color: #216ce7;
  }
`;

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname || !formData.surname || !formData.email || !formData.password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Insira um e-mail válido.');
      return;
    }
    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não correspondem.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:3000/v1/user', formData);
      setSuccessMessage('Usuário criado com sucesso!');
      setFormData({ firstname: '', surname: '', email: '', password: '', confirmPassword: '' });
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'E-mail já cadastrado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Background />
      <Card>
        <Logo src={logo} alt="Logo" />
        <Title>Crie sua conta</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstname"
            placeholder="Nome"
            value={formData.firstname}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="surname"
            placeholder="Sobrenome"
            value={formData.surname}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <Error>{error}</Error>}
          {successMessage && <Error style={{ color: '#27ae60' }}>{successMessage}</Error>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Inscreva-se'}
          </Button>
        </Form>
        <Footer>
          Já tem uma conta? Entre <Link to="/">aqui</Link>
        </Footer>
      </Card>
    </Container>
  );
};

export default SignUp;
