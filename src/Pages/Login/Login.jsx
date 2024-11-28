import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/AuthContext';
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
  margin: 20px;
  padding: 140px 30px 54px;
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
  margin: 0 0 30px;
  color: rgba(0, 0, 0, 0.38);
`;

const Form = styled.form`
  margin: 0 0 44px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: -8px 0 10px;
  text-align: left;
  width: 100%;
  max-width: 320px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 400px;
  height: 56px;
  border-radius: 28px;
  font-size: 16px;
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
`;

const Footer = styled.footer`
  color: #a1a1a1;

  a {
    color: #216ce7;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'O campo de e-mail está vazio.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'O campo de senha está vazio.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/v1/user/token', formData);
      const { token, user } = response.data;
      login(token, user); 
      navigate('/Home'); 
    } catch (err) {
      setErrors({ ...errors, password: 'O email ou senha estão incorretos.' });
    }
  };

  return (
    <Container>
      <Background />
      <Card>
        <Logo src={logo} alt="Logo" />
        <Title>Seja bem-vindo</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Usuário"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type="submit">Entrar</Button>
        </Form>
        <Footer>
          Precisa de uma conta? Inscreva-se <Link to="/SignUp">aqui</Link>
        </Footer>
      </Card>
    </Container>
  );
};

export default Login;
