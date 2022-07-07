import { React, useEffect, useState } from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import axios from '../api/axios'
import Slide from '../components/Slide'
import { StyledPlayer } from '../styles/Player.styled'



const SlidePlayer = (params) => {

  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();

  //* Slides data
  const [slidesState, setSlides] = useState([]);
  const [slidesFilteredLength, setslidesFilteredLength] = useState(3);

  const getSlides = async () => {    
    try {
      const response = await axios.get('/slides')
      setSlides(response.data);

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    setslidesFilteredLength(slidesState.filter(slide => slide.collectionName === `${params.collectionName}`).length)
    console.log(slidesFilteredLength);
  }, [slidesState])

  useEffect(() => {

    getSlides();


    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  //* Slide controller
  const [current, setCurrent] = useState(0)

  const nextSlide = () => { console.log(current + ' : ' + slidesFilteredLength); setCurrent(current >= slidesFilteredLength - 1 ? 0                        : current + 1) }
  const prevSlide = () => { console.log(current + ' : ' + slidesFilteredLength); setCurrent(current <=                        0 ? slidesFilteredLength - 1 : current - 1) }

  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }
  async function autoAdv(speed){
    await delay(speed)
    nextSlide()
  }
  // autoAdv(5)

  return (
    <>
    <StyledPlayer className="slider">
      <RiArrowLeftSLine  className='left-arrow'  onClick={prevSlide} />
      <RiArrowRightSLine className='right-arrow' onClick={nextSlide} />

      {/* // TODO if no catagory show all slides? */}

      <ul className='slider-list template--0'>
        {/* {slidesState.map((slide, _id) => {
          return(
            <li className={_id === current ? 'slide active' : 'slide'} key= {_id}>
              { _id === current && (
                
                <Slide {...slide} />
                // <img src={"./root/media/" + slide} className='image'></img>
                
                ) }
              
            </li>
          )
        })} */}
        {slidesState.filter(slide => slide.collectionName === `${params.collectionName}`).slice().reverse().map((post, i) => (
          
          <li className={i === current ? 'slide active' : 'slide'} key= {i}>

            { i === current && (
              <Slide {...post} />
              ) }
            
          </li>
        ))}
      </ul>

    </StyledPlayer>
    </>
  )
}

export default SlidePlayer