import React from 'react'

import styled from 'styled-components'

const Slide = (props) => {
  return (
    <>
      <article style={{ backgroundColor: props.color}}>
        <h2>{props.title}</h2> 
        <p>{props.content}</p>
        <br />

        <ul className='meta-data'>
          <li>{props.author}</li>
          <li>{props.dateMod}</li>
          <li>{props.template}</li>
          <li>{props.collectionName}</li>
        </ul>
      </article>
    </>
  )
}

export default Slide