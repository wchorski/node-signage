import React, {useEffect} from 'react'
import { FaRegHandPeace } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
  
    setTimeout(() => {
      navigate('/')
    }, 3000)


  }, [])


  return (
    <>
      <div>You're Logged out</div>
      <FaRegHandPeace className='peaceOut'/>
      <Link to="/" > Back to Homepage </Link>
    </>
  )
}

export default Logout