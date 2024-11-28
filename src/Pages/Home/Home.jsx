import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../Layout/Layout';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Stock from '../../assets/stock.svg'

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: calc(100vh - 120px);
  background: linear-gradient(135deg, #e0f7fa, #f1f8ff);
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin-top: 10px;
  max-width: 800px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #007bff;
  font-size: 2.8em;
  margin-bottom: 15px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 600px) {
    font-size: 2em;
  }
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1.2em;
  margin-bottom: 25px;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

const Illustration = styled.div`
  margin-bottom: 10px;
  img {
    width: 100px;
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  width: 100px;
  height: 100px;
  background-color: white;
  color: #007bff;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.1em;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 2em;
  }
`;

function Home() {
  return (
    <Layout>
      <MainContainer>
        <WelcomeSection>
          <Illustration>
            <img src={Stock} />
          </Illustration>
          <Title>Bem-vindo ao EstoqueVirtual!</Title>
          <Subtitle>Crie e gerencie seu estoque de forma fácil e organizada.</Subtitle>
          <ButtonContainer>
            <Card to="/ProductList">
              <AiOutlineUnorderedList />
              Produtos Cadastrados
            </Card>
          </ButtonContainer>
        </WelcomeSection>
      </MainContainer>
    </Layout>
  );
}

export default Home;
