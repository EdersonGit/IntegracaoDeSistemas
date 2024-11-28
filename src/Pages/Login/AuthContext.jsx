import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar se o token está no localStorage e inicializar o estado do usuário
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser)); // Carregar os dados do usuário
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`; // Configura o token nas requisições
    }
  }, []);

  const login = (userData, token) => {
    // Salvar os dados do usuário e o token no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);

    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
