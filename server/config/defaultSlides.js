const Slide = require('../model/Slide');
const fakeData = require('./defaultSlides.json')


const defaultSlides = async () => {
  const slides = await Slide.find();
  
  if (slides.length === 0){

    console.log('*** *** *** *** *** ***');
    console.log('*** NO Slides FOUND. CREATING DEFAULT ***');
    console.log('*** *** *** *** *** ***');

    fakeData.forEach(async (slide) => {
      try{

        const createNew = await Slide.create({
          ...slide
        })
    
        console.log('* new slide -> ' + slide.title)
    
      } catch (err){
        console.log(err);
      }
    })
  }

}

module.exports = defaultSlides