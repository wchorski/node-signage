import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'

import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

import axios from '../api/axios'
import { StyledPostsList } from '../styles/PostsList.styled'
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Slides = () => {

  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [postsArray, setPosts] = useState([]);
  // const [roleState, setroleState] = useState('');

  const controller = new AbortController();

  const getPosts = async () => {    
    try {
      const response = await axios.get('/slides')
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {

    getPosts();
    // setroleState(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <>
      <Navbar />

      <section>
        <StyledPostsList>
          {postsArray.slice().reverse().map((post) => (

              <article className='excerpt' key={post._id}>
                <Slide {...post} />

                <div className="editBtns">
                  <ul>
                    <li>Edit</li>
                    <li>Delete</li>
                    <li>Select</li>
                  </ul>
                </div>
              </article>
          ))}
        </StyledPostsList>
        
        {/* <SlideEditor /> */}
        {/* <SlideCreator /> */}
      </section>
    </>
  )
}

export default Slides