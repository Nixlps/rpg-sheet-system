import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AUTH_API_REGISTER } from "../../constants";

import './Register.scss';

function Register(){
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [checkPassword, setCheckPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const handleChange = e => {
    setErrorMessage('');
    setNewUserData({...newUserData, [e.target.name]: e.target.value});
  }
  
  async function registerRequest() {
    setIsLoading(true);
    try {
      const response = await fetch(AUTH_API_REGISTER, {
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
          localStorage.setItem('token_rpg_status', data.status);
          navigate('/');
        } else {
          setIsLoading(false);
          setErrorMessage(data.error);
        }
      } else {
        throw new Error('Resposta não contém dados JSON válidos.');
      }
    } catch (error) {
      console.error('Erro:', error.message);
      setIsLoading(false);
    }
  }

  const formValidation = () => {
    
    if(newUserData.username === '' || newUserData.email === '' || newUserData.password === ''){
      setErrorMessage('Todos os campos são obrigatórios');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(newUserData.email)){
      setErrorMessage('Digite um email válido');
      return false;
    }

    if(checkPassword === false){
      setErrorMessage('As senhas não conferem');
      return false;
    }
    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(formValidation()){
      registerRequest();
    }
  }

  return(
    <div className="register-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      <form className="form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-login">{errorMessage}</div>}
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