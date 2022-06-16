// import { url } from 'inspector';
import React from 'react'

import { StyledSlide } from '../styles/Slide.styled'

const API_IP = process.env.REACT_APP__API_IP;
const API_PORT = process.env.REACT_APP__API_PORT;







const Slide = (props) => {

  const imgBG = `${API_IP}:${API_PORT}/` + props.imageData
  const imgBG_sani = imgBG.replace(/\\/g, '/')
  console.log(imgBG_sani);

  return (
    <>
    <StyledSlide>

      <div 
        className='slide-0' 
        style={{  backgroundColor: props.color, 
                  backgroundImage: `url(${imgBG_sani})`,
                  backgroundSize: "contain", 
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',}}
      >
        <h2>{props.title}</h2> 
        <p>{props.content}</p>
        <br />

        {/* <img src={imgBG} alt={props.imageName} /> */}

        <ul className='meta-data'>
          <li>{props.author}</li>
          <li>{props.dateMod}</li>
          <li>{props.template}</li>
          <li>{props.collectionName}</li>
        </ul>
        
      </div>
    </StyledSlide>
    </>
  )
}

export default Slide