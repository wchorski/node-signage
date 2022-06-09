import React from 'react'

import styled from 'styled-components'
import { StyledSlide } from '../styles/Slide.styled'

const Slide = (props) => {
  return (
    <>
    <StyledSlide>

      <div className='slide-0' style={{ backgroundColor: props.color}}>
        <h2>{props.title}</h2> 
        <p>{props.content}</p>
        <br />

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