import React from 'react'
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom'
import SlidePlayer from '../components/SlidePlayer'

const Player = () => {

  let { collectionName } = useParams() 


  return (
    <>
      <SlidePlayer collectionName={collectionName}/>
    </>
  )
}

export default Player