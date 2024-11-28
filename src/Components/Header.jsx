import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineAppstore} from 'react-icons/ai';
import { useAuth } from '../Pages/Login/AuthContext';
import styled from 'styled-components';
import { TbLogout } from "react-icons/tb";

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 3rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    height: 24px;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Button = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    text-decoration: none;
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const LogoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 20px;
  background: linear-gradient(90deg, #dc3545, #a71d2a);
  color: white;
  border-radius: 18px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    background-color: #a71d2a;
  }
`;

const EstoqueButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 20px;
  background: linear-gradient(90deg, #358bdc, #007bff);
  color: white;
  border-radius: 18px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.05);
    background-color: #007bff;
  }
`;

function Header() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <HeaderContainer>
      <Logo>
        <Button to="/Home">EstoqueVirtual</Button>
      </Logo>
      <Nav>
        <EstoqueButton to="/ProductList">
          <AiOutlineAppstore />Estoque
        </EstoqueButton>
        <LogoutButton onClick={handleLogout}>
          <TbLogout />Sair
        </LogoutButton>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
