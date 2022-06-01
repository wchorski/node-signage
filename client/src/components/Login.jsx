import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import { useInput } from '../hooks/useInput';
import { useToggle } from '../hooks/useToggle';

import axios from '../api/axios';
import { StyledMiniForm } from '../styles/MiniForm.styled';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, resetEmail, emailAttributeObj] =  useInput('email', '') //useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false)

    useEffect(() => {
      emailRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('/auth',
          JSON.stringify({ email, pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ email, pwd, roles, accessToken });
        resetEmail() // setEmail('');
        setPwd('');
        navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setErrMsg('Missing Email or Password');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();
      }
    }

    // const togglePersist = () => {
    //   setPersist(prev => !prev)
    // }

    // useEffect(() => {
    //   localStorage.setItem('persist', persist)
    // }, [persist])

    return (


      <div className='content innerbody'>
        <section>
          <StyledMiniForm>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Login</h1>


            <form onSubmit={handleSubmit} className='popUp'>

                <label htmlFor="email"><FaUserAlt /></label>
                <input
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  {...emailAttributeObj}
                  required
                  placeholder='email...'
                />

                <label htmlFor="password"><MdPassword /></label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder='password...'
                />


                <button>Login</button>
                <div className='persistCheck'>
                  <input 
                    type='checkbox'
                    id='persist'
                    onChange={toggleCheck}
                    checked={check}
                  />
                  <label htmlFor='persist'> <i>Keep me Logged into this computer </i></label>
                </div>
            </form>


            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/signup">Sign Up</Link>
                </span>
                <br />
                <Link to="/">Home</Link>
            </p>
          </StyledMiniForm>
        </section>
      </div>

    )
}

export default Login
