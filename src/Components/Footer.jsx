import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #6c757d;
  text-align: center;
  padding: 15px 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9em;
`;

const FooterLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} Estoque Virtual - Todos os direitos reservados |{' '}
        <FooterLink href="#contato">Contato</FooterLink> |{' '}
        <FooterLink href="#termos">Termos de Serviço</FooterLink>
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;
