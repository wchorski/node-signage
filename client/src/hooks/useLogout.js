import axios from '../api/axios'
import useAuth from './useAuth'
import Cookies from 'js-cookie'

export const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {

    // empty out current auth state
    setAuth({})

    try{
      const response = await axios('/logout', {
        withCredentials: true
      })
      Cookies.remove('username')
      Cookies.remove('role')
    } catch (err) {
      console.error(err);
    }
  }

  return logout
}