import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthUserContext from '../context/AuthUserContext'
import myfetch from '../lib/myfetch';
import MenuItem from './MenuItem';

export default function AppHeader() {
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async function () {
      try {
        const result = await myfetch.get('/users/me')
        setAuthUser(result)
      } catch (error) {
        console.log(error)
        setAuthUser(null)
      }
    })()
  }, [location])

  function handleLogoutClick() {
    if (confirm('Deseja realmente sair?')) {
      setAuthUser(null)
      window.localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_NAME)
      navigate('/login')
    }
  }
  function AuthControl() {
    if (authUser) return (
      <li style={{ marginLeft: '36px' }}>
        <span>{authUser.username}</span>&nbsp;
        (<a href='#' onClick={handleLogoutClick}>Sair</a>)
      </li>
    )
    else return (
      <li style={{ marginRight: '12px' }}>
        <Link to="/login">Entrar</Link>
      </li>
    )
  }
  return (
    <>
      <h1>Segurança no Desenvolvimento de Aplicações</h1>
      <hr />
      <ol style={{ listStyleType: 'none', display: 'flex' }}>
        <MenuItem dest={'/'}>Página inicial</MenuItem>
        <MenuItem dest={'/users'}>Usuários</MenuItem>
        <AuthControl />
      </ol>
    </>
  )
}