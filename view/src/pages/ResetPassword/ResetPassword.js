import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { AUTH_API_NEW_PASSWORD, AUTH_API_RESET } from "../../constants";

import './ResetPassword.scss'

function ResetPassword(){
  // Acess through email link
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState('');

  // Acess through reset password link
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // General settings
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mainMessage, setMainMessage] = useState('Insira seu email');

  async function resetRequest() {
    try {
      const response = await fetch(AUTH_API_RESET, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setConfirmed(true)
          setMainMessage('Enviamos um link de redefinição de senha para seu email.');
          return response.json()
        }
        throw new Error('error')
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async function newPasswordRequest() {
    try {
      const response = await fetch(AUTH_API_NEW_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          new_password: newPassword,
          token: token
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setConfirmed(true)
          setMainMessage('Senha alterada com sucesso!');
          return response.json()
        }
        throw new Error('error')
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSubmitEmail = e => {
    e.preventDefault();
    setIsLoading(true);
    resetRequest();
  }

  const handleSubmitPassword = e => {
    e.preventDefault();
    setIsLoading(true);
    newPasswordRequest();
  }

  return(
    <div className="login-screen">
      {isLoading ? <LoadingSpinner /> : <></>}

      {errorMessage && <div className="error-login">{errorMessage}</div>}
      
      {token===null && 
        <div>
          <h2 className={confirmed ? 'sucess' : ''}> {mainMessage} </h2>
          {!confirmed && 
            <form className="form" onSubmit={handleSubmitEmail}>
              <input type="text" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} value={email}/>
              <button type="submit" className="form-button">Enviar</button>
            </form>      
          }
        </div>
      }
      
      {token!=null && 
        <div>
          <h2 className={confirmed ? 'sucess' : 'hide'}> {mainMessage} </h2>
          {!confirmed && 
            <form className="form" onSubmit={handleSubmitPassword} noValidate>
              <input type="text" placeholder="Nova senha" name="new-password" onChange={e => setNewPassword(e.target.value)} value={newPassword}/>
              <input type="text" placeholder="Confirmar senha"/>
              <button type="submit" className="form-button">Enviar</button>
            </form>      
          }
        </div>
      }

      <Link to="/" className="login-link">Voltar a página de Login</Link>
    </div>
  )
}

export default ResetPassword