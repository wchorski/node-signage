import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSkullCrossbones, FaEject, FaUserEdit } from 'react-icons/fa'
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import Navbar from '../components/Navbar'
import { StyledPopUp } from '../styles/popup.styled'
import { UserSingle } from '../components/UserSingle'


export const User = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL


  const [isAreYouSure, setisAreYouSure] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [userState, setuserState] = useState({username: "NoName"});
  // const [fetchError, setFetchError] = useState(null);


  const getUserInfo = async () => {
    try {
      const response = await axiosPrivate.get(`/users/${_id}`, {
        signal: controller.signal
      })
      // console.log(response.data);
      setuserState(response.data);
      setIsLoading(false)

    } catch (err) {
      console.error('---getUser failed');
      console.error(err);
      navigate('/admin', { state: { from: location }, replace: true });
    }
  }


  const deleteUser = async (_id) => {
    try {
      axiosPrivate.delete(`/users/${_id}`).then(res => {
        console.log('Deleted!!!', res)
        navigate('/admin')

      })
    } catch (err) {
      console.error(err)
    }
  }


  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }

  useEffect(() => {
    getUserInfo()
    // console.log('User.jsx useEffect');
  }, [])


  return (
    <>
      <Navbar />
      <section>
        <div className="editBtns">
          <button className='btnDelete' onClick={() => toggleAreYouSure()}> <FaTrashAlt /> </button>
          <Link to={`/users/editor/${_id}`} className='editMe'><FaUserEdit /></Link>
        </div>

        {isAreYouSure && (
          <StyledPopUp>
            <h3>Delete User</h3>
            <button className='editBtn' onClick={() => deleteUser(_id)}> yes I'm sure <FaSkullCrossbones /> </button>
            <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
          </StyledPopUp>
        )}

        {!isLoading && (
          <UserSingle {...userState} />
        )}

      </section>
    </>
  )
}