import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import './Login.scss';

function Login(){
  const [userData, setUserData] = useState({
    login: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const handleChange = e => {setUserData({...userData, [e.target.name]: e.target.value})}

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    // check with database if this user exists and if password is correct
    // if correct, redirect to logged page
    // if not, error message
    console.log('submission complete!');
    setIsLoading(false);
  }

  return(
    <div className="login-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      {/* {errorMessage && <div className="error-login">{errorMessage}</div>} */}
      
      <form className="form" onSubmit={handleSubmit} noValidate>
        <input type="text" placeholder="Login (username ou email)" onChange={handleChange}/>
        <input type="text" placeholder="Senha" onChange={handleChange}/>
        <button type="submit" className="form-button">Login</button>
      </form>

      <Link to="/cadastro" className="login-link">Não tem cadastro? Clique aqui</Link>
      {/* <Link to="/cadastro" className="login-link">Esqueceu sua senha? Clique aqui</Link> */}
    </div>
  )
}

export default Login