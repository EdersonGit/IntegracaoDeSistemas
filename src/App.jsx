import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Pages/Login/AuthContext'; 
import Login from './Pages/Login/Login';
import SignUp from './Pages/CadastroUsuario/SingUp';
import ProductList from './Pages/CadastroProduto/ProductList';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginRedirect />}
          />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/Home"
            element={<PrivateRoute component={Home} />}
          />
          <Route
            path="/ProductList"
            element={<PrivateRoute component={ProductList} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};


const LoginRedirect = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/Home " /> : <Login />;
};

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/" />;
};

export default App;
