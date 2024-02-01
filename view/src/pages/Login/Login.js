import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import './Login.scss';
import OpenEye from '../../../assets/icons/eye-open.svg';
import CloseEye from '../../../assets/icons/eye-close.svg';

import { AUTH_API_LOGIN } from "../../constants";

function Login(){
  const [userData, setUserData] = useState({
    login: "",
    password: ""
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e => {setUserData({...userData, [e.target.name]: e.target.value})}

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function loginRequest() {
    try {
      const response = await fetch(AUTH_API_LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          login: userData.login,
          password: userData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro na requisição.');
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.status) {
          setIsLoading(false);
          localStorage.setItem('token_rpg_login', data.status);
          navigate('/home');
        } else {
          setIsLoading(false);
          setErrorMessage(data.error);
        }
      } else {
        throw new Error('Resposta não contém dados JSON válidos.');
      }
    } catch (error) {
      console.error('Erro:', error.message);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    loginRequest();
  }

  return(
    <div className="login-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      <form className="form" onSubmit={handleSubmit} noValidate>
      {errorMessage && <div className="error-login">{errorMessage}</div>}
        <input type="text" placeholder="Login (username ou email)" name="login" onChange={handleChange} value={userData.login}/>
        <input type={showPassword ? 'text' : 'password'} placeholder="Senha" name="password" onChange={handleChange} value={userData.password}/>
        <div className="show-hide-password" onClick={handleTogglePassword}>
          {showPassword ? <OpenEye/> : <CloseEye/>}
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>

      <div className="login-links">
        <Link to="/cadastro">Não tem cadastro? Clique aqui</Link>
        <Link to="/recuperar-senha">Esqueceu sua senha? Clique aqui</Link>
      </div>
    </div>
  )
}

export default Login