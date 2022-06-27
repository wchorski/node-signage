import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
// import Cookies from 'js-cookie'

import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

import axios from '../api/axios'
import { StyledPostsList } from '../styles/PostsList.styled'
import { StyledCollectionPreview } from '../styles/CollectionPreview.styled'
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CollectionPreview = (props) => {

  // const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [slidesState, setSlidesState] = useState([]);
  // const [roleState, setroleState] = useState('');

  const controller = new AbortController();

  const getSlides = async () => {    
    try {
      const response = await axios.get('/slides')
      setSlidesState(response.data);
    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {

    getSlides();
    // setroleState(Cookies.get('role')) 

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <>
      <StyledCollectionPreview>
        <h3>{props.collectionName}</h3>
        <Link to={`/slides/${props.collectionName}`}>
          <div className="collectionBlock">
            {slidesState.filter(slide => slide.collectionName === `${props.collectionName}`).slice(0,4).reverse().map((slide) => (
              <Slide {...slide} key={slide._id}/>
            ))}
          </div>
        </Link>

      </StyledCollectionPreview>
    </>
  )
}

export default CollectionPreview