import { React, useEffect, useState } from 'react'
import {useNavigate, useLocation, Link} from 'react-router-dom'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import axios from '../api/axios'
import Slide from '../components/Slide'
import { StyledPlayer } from '../styles/Player.styled'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const SlidePlayer = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  const [isLoaded, setIsLoaded] = useState(false)

  //* Slides data
  const [slidesState, setSlides]                        = useState([]);
  const [activeSlides, setactiveSlides]                 = useState([]);
  const [catsState, setCatsState]                       = useState([]);
  const [sliderSettings, setsliderSettings]             = useState({})

  const [settingsState, setsettingsState]     = useState([]);
  const getSettings = async () => {
    try{
      const res = await axios.get('/settings')
      const data = res.data

      setsettingsState(data)
      
    } catch (err) {
      console.error(err);
    } 
  }

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

    getSettings()
    getSlides()
    getCats()

    const refresh = setInterval(() => {
      // console.log('slideplayer refresh slides');
      // TODO make seamless refresh 
      // setIsLoaded(false)

      getSettings()
      getSlides()
      getCats()
    }, 15000)

  
    return () => {
      clearInterval(refresh)
      controller.abort()
    }

  }, [])

  useEffect(() => {
    filterSlides()

  }, [slidesState, catsState])



  useEffect(() => {


    if(settingsState.length === 0 || !settingsState) return

    // console.log('useEffect w/ settingsState dep');

    const newSliderSettings = {
      fade: true,
      dots: true,
      infinite: true,
      autoplay: settingsState[0].autoAdv,
      autoplaySpeed: 1000 * settingsState[0].advSpeed,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    setsliderSettings(newSliderSettings)
    

  }, [settingsState])


  const filterSlides = () => {

    let fltrSlds = []
  

    getActiveCats().forEach(name => {
      const filtered = slidesState.filter(slide => {
        return slide.collectionName === name
      })

      fltrSlds.push(...filtered)
      setactiveSlides(fltrSlds)
      setIsLoaded(true)
    })
  }


  return (
    <>
    <StyledPlayer className="slider">
      {isLoaded && (
        <Slider {...sliderSettings}>
          {
            activeSlides
              .map((slide, i ) => (
                <Slide {...slide} key={i}/>
              ))
          }
        </Slider>
      )}
      {!isLoaded && (
        <h1>Loading...</h1>
      )}

    </StyledPlayer>
    </>
  )
}

export default SlidePlayer