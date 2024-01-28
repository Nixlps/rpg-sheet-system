import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import './Register.scss';

function Register(){
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [checkPassword, setCheckPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const navigate = useNavigate();

  const handleChange = e => setNewUserData({...newUserData, [e.target.name]: e.target.value});
  
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    // add validation
    // send to database
    setIsLoading(false);
    // sucess msg, redirect to logged page
  }

  return(
    <div className="register-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      {/* {errorMessage && <div className="error-login">{errorMessage}</div>} */}
      
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