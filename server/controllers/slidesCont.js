const Slide = require('../model/Slide');
const multer = require('multer');
const fs = require("fs")

// * img processing 
// * img processing 
// * img processing 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    // TODO admin variable
      fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
// * * * * * * * * * * * * * * * *



exports.getAll = async (req, res) => {
  const slides = await Slide.find();
  if (!slides) return res.status(204).json({ 'message': 'No data found' });
  // console.log(slides[1].imageData);
  // console.log( res.sendFile(__dirname + "../" + slides[1].imageData) );
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

// * 
// * CREATE
// * 
// TODO why does this not work in seperate Controller script?
exports.create = upload.single('imageData'), (req, res, next) => {
  // console.log(req.body);
  console.log(req.file);
  const newImage = new Slide({
    author:          req.body.author,
    title:           req.body.title,
    content:         req.body.content,
    color:           req.body.color,
    template:        req.body.template,
    collectionName:  req.body.collectionName,
    
    imageName: req.body.imageName,
    imageData: req.file.path,
  });
  newImage.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch((err) => next(err));
}

// exports.create = (upload.single('imageData')), async (req, res, next) => {

//   console.log('sildes cont');
//   console.log(req.body);
//   console.log(req.file);
//   console.log('----------------------------');
//   try{
//     const newSlide = await Slide.create({
//       author: req.body.author,
//       title: req.body.title,
//       // ...req.body, 
//       // imageData: req.file.path
//     })

//     res.status(200).json({
//       status: 'successful create',

//       data: {
//         ...newSlide
//       }
//     })

//   } catch (err){
//     console.error(err);
//     next(err)
//     res.status(400).json({status: 'failed POST create',})
//   }
// }

// upload.single('imageData'), (req, res, next) => {
//   console.log(req.body);
//   const newImage = new Image({
//     imageName: req.body.imageName,
//     imageData: req.file.path
//   });

//   newImage.save()
//     .then((result) => {
//       console.log(result);
//       res.status(200).json({
//         success: true,
//         document: result
//       });
//     })
//     .catch((err) => next(err));
// }



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
