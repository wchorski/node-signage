import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom'
import axios from '../api/axios'
import { VscDiffAdded } from 'react-icons/vsc'
import { FaRegTrashAlt } from 'react-icons/fa'

import Navbar from '../components/Navbar'
import Slide from '../components/Slide'
import { StyledPostsList } from '../styles/PostsList.styled'
import SlideCreateMulti from '../components/SlideCreateMulti'
import { AiFillPlaySquare } from 'react-icons/ai'

const Collection = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL
  const [slidesState, setSlidesState] = useState([]);
  const [collectionState, setcollectionState] = useState({});

  const getSlides = async () => {    
    try {
      const response = await axios.get('/slides')
      setSlidesState(response.data);

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const getCol = async () => {
    try{
      const res = await axios.get(`/collectionname/${_id}`)
      setcollectionState(res.data)

    } catch (err){
      console.error(err);
    }
  }

  const deleteCat = async () => {
    try{
      const res = await axios.delete(`/collectionname/${_id}`)
      navigate(`/slides`)

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
      getSlides();
      
      // navigate('/slides')
    }
  }

  useEffect(() => {

    getSlides();
    getCol()
    console.log(_id);
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
        <div className="col-headr">
          <h1>{collectionState.collectionName}</h1>
          
          <Link to={`/player/${collectionState.collectionName}`} className="btnPlayer"><AiFillPlaySquare /> Play Collection</Link>
          
          <button className='btnDelete' onClick={deleteCat}>
            <FaRegTrashAlt />
          </button>

        </div>
        

        
        <SlideCreateMulti collectionName={collectionState.collectionName} _id={collectionState._id}/>

        <StyledPostsList>
          {slidesState.filter(slide => slide.collectionName === `${collectionState.collectionName}`).slice().reverse().map((post) => (

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
      </section>
    </>
  )
}

export default Collection