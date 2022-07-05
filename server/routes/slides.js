const express = require('express');
const router = express.Router();
const controller = require('../controllers/slidesCont');
const multer = require('multer');
const Slide = require('../model/Slide');
// const ROLES_LIST = require('../config/roles_list');
// const verifyRoles = require('../middleware/verifyRoles');

// * Multer * * * * * * * 
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
// * end



router.route('/')
  .get(controller.getAll)

  // .post(controller.create) // TODO why does this not work but below does?
  .post(upload.single('imageData'), (req, res, next) => {
    // console.log(req.body);
    console.log(req.file);
    const newImage = new Slide({
      author:          req.body.author,
      title:           req.body.title,
      content:         req.body.content,
      color:           req.body.color,
      template:        req.body.template,
      collectionName:  req.body.collectionName,
      
      imageName:       req.body.imageName,
      imageData:       req.file.path,
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
  });

router.route('/:id')
  .get(controller.getOne)
  .delete(controller.delete)
  .patch(upload.single('imageData'), async (req, res, next) => {

    const slide = await Slide.findById(req.params.id)

    const filepath = (req.file) ? req.file.path : ''

    if(req.file){
      Object.assign(slide, {
        author:          req.body.author,
        title:           req.body.title,
        content:         req.body.content,
        color:           req.body.color,
        template:        req.body.template,
        collectionName:  req.body.collectionName,
        
        imageName:       req.body.imageName,
        imageData:       filepath,
      })

    }else{
      Object.assign(slide, {
        author:          req.body.author,
        title:           req.body.title,
        content:         req.body.content,
        color:           req.body.color,
        template:        req.body.template,
        collectionName:  req.body.collectionName
      })
    }

    
    slide.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          document: result
        });
      })
      .catch((err) => next(err));
  });


module.exports = router;