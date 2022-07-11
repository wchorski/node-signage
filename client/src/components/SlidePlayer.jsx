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

  //* Slides data
  const [slidesState, setSlides]                        = useState([]);
  const [activeSlides, setactiveSlides]                        = useState([]);
  const [slidesFilteredLength, setslidesFilteredLength] = useState(3);
  const [catsState, setCatsState]                       = useState([]);

  const getSlides = async () => {    
    try {
      const response = await axios.get('/slides')
      setSlides(response.data);

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const getCats = async () => {
    try{
      const res = await axios.get('/collectionname')
      setCatsState(res.data)

    } catch (err) {
      console.error(err);
      navigate('/', { state: { from: location }, replace: true });
    }
  }

  const getActiveCats = () => {
    const activeCatNames = catsState.filter(cat => cat.isactive === true).map(cat => cat.collectionName)
    return activeCatNames
  }

  useEffect(() => {
    filterSlides()

  }, [slidesState, catsState])

  useEffect(() => {

    getSlides();
    getCats();

    // setInterval(() => {
    //   getSlides();
    // }, 30000)

    return () => {
      // isMounted = false;
      controller.abort();
    }
  }, [])


  //* Slide controller
  const [current, setCurrent] = useState(0)

  const nextSlide = () => { console.log((current + 1) + ' : ' + slidesFilteredLength); setCurrent(current >= slidesFilteredLength - 1 ? 0                        : current + 1) }
  const prevSlide = () => { console.log((current + 1) + ' : ' + slidesFilteredLength); setCurrent(current <=                        0 ? slidesFilteredLength - 1 : current - 1) }

  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
  }
  async function autoAdv(speed){
    await delay(speed)
    nextSlide()
  }
  // autoAdv(8)


  const filterSlides = () => {

    let fltrSlds = []
  

    getActiveCats().forEach(name => {
      const filtered = slidesState.filter(slide => {
        return slide.collectionName === name
      })

      fltrSlds.push(...filtered)
      setactiveSlides(fltrSlds)
      setslidesFilteredLength(fltrSlds.length)

    })
  }

  return (
    <>
    <StyledPlayer className="slider">
      <RiArrowLeftSLine  className='left-arrow'  onClick={prevSlide} />
      <RiArrowRightSLine className='right-arrow' onClick={nextSlide} />

      {/* //TODO get rid of this inline style later */}
      <ul className='slider-list list--0' style={{flexDirection: "column"}}>


        {
          activeSlides
            .map((slide, i ) => (
              <li className={i === current ? 'slide active' : 'slide'} key= {i}>

                { i === current && (
                  <Slide {...slide} />
                )}
                
              </li>
            ))
        }
      </ul>

    </StyledPlayer>
    </>
  )
}

export default SlidePlayer