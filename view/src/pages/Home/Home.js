import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import './Home.scss';

import { AUTH_API_USER } from "../../constants";


function Home(){
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = useCallback(async () => {
    try {
      await fetch(AUTH_API_USER, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_rpg_login'),
        },
      })
        .then((respose) => {
          if (respose.ok) {
            setIsLoading(false);
            return respose.json()
          }
          throw new Error('error')
        })
        .then((data) => {
          setUser(data.status)
        })
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem('token_rpg_login')){
      setIsLoading(true);
      getUser()
    }
    else{
      navigate('/')
    }
  }, [getUser])

  const handleLoggout = () => {
    localStorage.removeItem('token_rpg_login');
    navigate('/');
  }

  return(
    <div className="profile">
      {isLoading ? <LoadingSpinner /> : <></>}
      <nav>
        <a onClick={handleLoggout}>Logout</a>
      </nav>
      <h2>Usuário</h2>
      {user && (
        <>
          <label>Usuário: {user.username}</label>
          <br/>
          <label>Email: {user.email}</label>
        </>
      )}
    </div>
  )
}

export default Home;