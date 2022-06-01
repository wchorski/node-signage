import React, { useState, useEffect, useContext } from "react"
import Cookies from 'js-cookie'
import { RiUser5Line, RiLogoutBoxRLine } from 'react-icons/ri';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios'

import { useLogout } from "../hooks/useLogout";
import logo from '../logo.svg'
import { StyledNavBar } from '../styles/Navbar.styled'

const Navbar = () => {

  const { setAuth } = useContext(AuthContext);
  const logout = useLogout()
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('--usernm--')

  useEffect((req, res) => {
    setUsername(Cookies.get('username'))
    // console.log('---navbar.jsx');
  }, [])

  const signOut = async () => {
    await logout()
    navigate('/logout');
  }


  return (
    <>
      <StyledNavBar>
        <div className="nav-bg-main">
          <nav className="main">
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <ul>
              <li><Link to="/"        > Home</Link></li>
              {Cookies.get('role') === 'admin' || 'editor' || 'user'
                ? <li><Link to="/slides"   > Slides</Link></li>
                : null
              }
              {Cookies.get('role') === 'admin'
                ? <li><Link to="/admin"   > Admin</Link></li>
                : null
              }
              <li><Link to="/slides"   > Slides</Link></li>
            </ul>
          </nav>
        </div>

        <div className="nav-bg-sub">
          <nav className="sub">
            <ul>
              <li><input type="text" placeholder="search..."/> <button className="btnSearch"><BiSearchAlt /> </button></li>
              {username 
                ? 
                  <li className='userCred'><RiUser5Line /> 
                    <span> {username} </span> 
                    <button onClick={signOut}><RiLogoutBoxRLine />logout</button>
                  </li>
                : 
                  <Link to="/login" className="userCred">Login</Link>

              }
            </ul>
          </nav>
        </div>
      </StyledNavBar>
      
    </>
  )
}

export default Navbar