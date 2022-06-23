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

  let imgBG = props.imageData;

  if(props.imageData && props.imageData[0] === 'u'){
    imgBG = `${API_IP}:${API_PORT}/` + props.imageData
    imgBG = imgBG.replace(/\\/g, '/')
  } 



  return (
    <>
    <StyledSlide 
      className={`styledSlide template--${props.template}`}
      style={
        {  
          backgroundColor: props.color, 
          backgroundImage: `url(${imgBG})`,
          backgroundSize: "contain", 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
        
      }
    >
      <div className={`template--${props.template}`}>
        <h2>{props.title}</h2> 

        {props.content != '' && 
          <>
            <div className='slide-content'>
              <p>{props.content}</p>  
            </div>
            <br />
          </>
        }
      </div>

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