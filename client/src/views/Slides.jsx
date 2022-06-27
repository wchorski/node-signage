import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'

import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

import axios from '../api/axios'
import { StyledPostsList } from '../styles/PostsList.styled'
import CollectionPreview from '../components/CollectionPreview'
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

  const deleteSlide = async (_id) => {
    console.log(_id);
    try {
      axios.delete(`/slides/${_id}`).then(res => {
        console.log('Deleted!!!', res)
      })

    } catch (err) {
      console.log(err)
    } finally {
      // TODO CSSTransitions to smoothly show update
      getPosts();
      // navigate('/slides')
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

  const getUniqueCats = (array) => {
    return [...new Set(array.map(q => q.collectionName))]
  }

  return (
    <>
      <Navbar />
      <section className='collections'>

        {getUniqueCats(postsArray).map(collection => {
          {console.log(collection);}
          <CollectionPreview collectionName={collection} />
        })}

        {/* {postsArray.map(post => (
            <CollectionPreview collectionName={post.collectionName} />
        ))}
         */}
        {/* <CollectionPreview collectionName="us_holidays"/>
        <CollectionPreview collectionName="australian_holidays"/>
        <CollectionPreview collectionName="vietnam_holidays"/> */}
      </section>

      <section>
        <StyledPostsList>
          {postsArray.slice().reverse().map((post) => (

              <article className='excerpt' key={post._id}>
                <Slide {...post} />

                <div className="editBtns">
                  <ul>
                    <li><Link to={`/slides/editor/${post._id}`} className='edit'>Edit</Link></li>
                    <li><button onClick={(e) => deleteSlide(post._id)}> Delete </button></li>
                    <li>
                      {/* // TODO screen reader label? */}
                      <input type="checkbox" id="selectBox" />
                      {/* <label for="selectBox">Select</label> */}
                    </li>
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