import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AUTH_API } from "../../constants";

import './Register.scss';

function Register(){
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [checkPassword, setCheckPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const handleChange = e => setNewUserData({...newUserData, [e.target.name]: e.target.value});
  
  async function registerRequest() {
    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        body: JSON.stringify({
          username: newUserData.username,
          password: newUserData.password,
          email: newUserData.email,
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
          localStorage.setItem('token', data.status);
          navigate('/');
        } else {
          setErrorMessage('Erro ao cadastrar novo usuário :(', console.log(data.status));
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
    // form validation
    registerRequest();
  }

  return(
    <div className="register-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      {errorMessage && <div className="error-login">{errorMessage}</div>}
      
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} value={newUserData.username}/>
        <input type="text" placeholder="Email" name="email" onChange={handleChange} value={newUserData.email}/>
        <input type="text" placeholder="Senha" name="password" onChange={handleChange} value={newUserData.password}/>
        <input type="text" placeholder="Confirmar senha" onChange={e => e.target.value===newUserData.password ? setCheckPassword(true) : setCheckPassword(false)}/>
        <button type="submit" className="form-button" disabled={isLoading}>Cadastrar</button>
      </form>

      <div className="register">
        <Link to="/" className="login-link">Voltar a tela de login</Link>
      </div>
    </div>
  )
}

export default Register