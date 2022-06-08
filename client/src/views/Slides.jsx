import React from 'react'
import Navbar from '../components/Navbar'
import SlideCreator from '../components/SlideCreator'
// import SlideEditor from '../components/SlideEditor'

const Slides = () => {
  return (
    <>
      <Navbar />
      <section>
        <h1>Slides</h1>
        {/* <SlideEditor /> */}
        <SlideCreator />
      </section>
    </>
  )
}

export default Slides