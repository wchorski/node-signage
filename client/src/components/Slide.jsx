import React from 'react'
import { format } from 'date-fns'

import { StyledSlide } from '../styles/Slide.styled'

const API_IP = process.env.REACT_APP__API_IP;
const API_PORT = process.env.REACT_APP__API_PORT;

const formatDate = (inputDate) => {
  try{
    return format(new Date( inputDate ), 'MM/dd/yyyy')

  } catch (err) {
    console.error(err)
  }
}



const Slide = (props) => {

  const imgBG = `${API_IP}:${API_PORT}/` + props.imageData
  const imgBG_sani = imgBG.replace(/\\/g, '/')

  return (
    <>
    <StyledSlide 
      className='styledSlide'
      style={{  backgroundColor: props.color, 
        backgroundImage: `url(${imgBG_sani})`,
        backgroundSize: "cover", 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',}}
    >
        <h2>{props.title}</h2> 

        {props.content != '' && 
          <>
            <div className='slide-content'>
              <p>{props.content}</p>  
            </div>
            <br />
          </>
        }

        {/* <img src={imgBG} alt={props.imageName} /> */}

        <ul className='meta-data'>
          <li>{props.author}</li>
          <li>{formatDate(props.dateMod)}</li>
          <li>{props.template}</li>
          <li>{props.collectionName}</li>
        </ul>
    </StyledSlide>
    </>
  )
}

export default Slide