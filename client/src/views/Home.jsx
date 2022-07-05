import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImHome3, ImGithub } from 'react-icons/im'

import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import axios from '../api/axios'

const Home = (props, req, res) => {

  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();



  return (
    <>
      <Navbar />
      <section>

        <h1>Node Signage</h1>
        <p><Link to='/login'>Login</Link> or <Link to='/signup'>Signup</Link></p>
        <br />
          <span> <a href="https://github.com/wchorski/node-signage">
                    <ImGithub style={{marginRight: "1rem", fontSize: "60px"}}/>
                    https://github.com/wchorski/node-signage
          </a></span>
        <br />
        

        



      </section>
    </>
  )
}

export default Home
