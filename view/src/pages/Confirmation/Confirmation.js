import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { AUTH_API_CONFIRM } from "../../constants";

import './Confirmation.scss';

function Confirmation(){
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mainMessage, setMainMessage] = useState('Insira o código enviado para o seu email');
  const [confirmed, setConfirmed] = useState(false);

  async function confirmRequest() {
    try {
      const response = await fetch(AUTH_API_CONFIRM, {
        method: 'POST',
        body: JSON.stringify({
          code: code,
        }),
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_rpg_login'),
        },
      }).then((respose) => {
        if (respose.ok) {
          setIsLoading(false);
          setMainMessage('Confirmação feita com sucesso!');
          setConfirmed(true)
          return respose.json()
        }
        throw new Error('error')
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    confirmRequest();
  }

  return(
    <div className="login-screen">
      {isLoading ? <LoadingSpinner /> : <></>}
      
      {errorMessage && <div className="error-login">{errorMessage}</div>}
      <h2 className={confirmed ? 'sucess' : ''}> {mainMessage} </h2>
      
      {!confirmed && 
        <form className="form" onSubmit={handleSubmit} noValidate>
          <input type="text" placeholder="Código" name="code" onChange={e => setCode(e.target.value)} value={code}/>
          <button type="submit" className="form-button">Enviar</button>
        </form>      
      }

      <Link to="/" className="login-link">Voltar a página de Login</Link>
    </div>
  )
}

export default Confirmation