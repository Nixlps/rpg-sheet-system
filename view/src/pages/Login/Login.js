import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import './Login.scss';

import { AUTH_API_LOGIN } from "../../constants";

function Login(){
  const [userData, setUserData] = useState({
    login: "",
    password: ""
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {setUserData({...userData, [e.target.name]: e.target.value})}

  async function loginRequest() {
    try {
      const response = await fetch(AUTH_API_LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          username: userData.login,
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
          setErrorMessage('Erro ao logar :(', console.log(data.status));
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
      
      {errorMessage && <div className="error-login">{errorMessage}</div>}
      
      <form className="form" onSubmit={handleSubmit} noValidate>
        <input type="text" placeholder="Login (username ou email)" name="login" onChange={handleChange} value={userData.login}/>
        <input type="text" placeholder="Senha" name="password" onChange={handleChange} value={userData.password}/>
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