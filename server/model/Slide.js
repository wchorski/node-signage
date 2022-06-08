const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }, 
  content: {
    type: String,
    required: false,
  },
  // img:{
  //   data: Buffer,
  //   contentType: String
  // },
  imgName: {
    type: String,
    default: "none",
    required: true
  },
  imgData: {
    type: String,
    required: false
  },
  view: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    required: false,
    default: "grey"
  },
  collectionName: {
    type: String,
    required: true,
    default: "nocollection"
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateMod: {
    type: Date,
  },
});

module.exports = mongoose.model('Slide', slideSchema);