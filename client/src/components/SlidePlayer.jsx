import { React, useEffect, useState } from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import axios from '../api/axios'
import Slide from '../components/Slide'
import { StyledPlayer } from '../styles/Player.styled'



const SlidePlayer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  let slideLength

  //* Slides data
  const [slidesState, setSlides] = useState([]);

  const getSlides = async () => {    
    try {
      const response = await axios.get('/slides')
      setSlides(response.data);

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    } finally {
      slideLength = slidesState.length
    }
  }

  useEffect(() => {

    getSlides();


    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  //* Slide controller
  const [current, setCurrent] = useState(0)

  const nextSlide = () => { setCurrent(current >= slidesState.length - 1 ? 0                      : current + 1) }
  const prevSlide = () => { setCurrent(current <=                      0 ? slidesState.length - 1 : current - 1) }

  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }
  async function autoAdv(speed){
    await delay(speed)
    nextSlide()
  }
  // autoAdv(3)

  return (
    <>
    <StyledPlayer className="slider">
      <RiArrowLeftSLine  className='left-arrow'  onClick={prevSlide} />
      <RiArrowRightSLine className='right-arrow' onClick={nextSlide} />

      <ul className='slider-list template--0'>
        {slidesState.map((slide, _id) => {
          return(
            <li className={_id === current ? 'slide active' : 'slide'} key= {_id}>
              { _id === current && (
                
                <Slide {...slide} />
                // <img src={"./root/media/" + slide} className='image'></img>
                
                ) }
              
            </li>
          )
        })}
      </ul>

    </StyledPlayer>
    </>
  )
}

export default SlidePlayer