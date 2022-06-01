const Slide = require('../model/Slide');

exports.getAll = async (req, res) => {
  const slides = await Slide.find();
  if (!slides) return res.status(204).json({ 'message': 'No data found' });
  res.json(slides);
}

exports.getOne = async (req, res) => {
  try{
    const slide = await Slide.findById(req.params.id)

    res.status(200).json(slide)

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed get: ', message: err.toString()})
  }
}

exports.create = async (req, res, next) => {
  try{

    const newSlide = await Slide.create({
      ...req.body
    })

    res.status(200).json({
      status: 'successful create',

      data: {
        ...newSlide
      }
    })

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed POST create',})
  }
}

exports.update = async (req, res, next) => {
  try{
    const slide = await Slide.findById(req.params.id)
    Object.assign(slide, req.body)
    res.status(200).json(slide)
    slide.save()

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed to update: ', message: err.toString()})
  }
}

exports.delete = async (req, res) => {
  try{
    const slide = await Slide.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'deleted data',
      slide,
    })

  } catch (err){
    console.error(err);
    res.status(400).json({status: 'failed deletion',})
  }
}
