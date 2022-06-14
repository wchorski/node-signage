const Image = require('../model/image');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "--" + Date.now());
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

exports.create = upload.single('imageData'), (req, res, next) => {
  console.log('working?');
  // console.log(req.body);
  // console.log(req.file);
  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.file.path,
    caption: req.body.caption
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