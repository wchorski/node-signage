const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  author: {
    type: String,
    required: false
  }, 
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
    default: "#efaf65" //grey
  },
  imageName: {
    type: String,
    default: "none",
    required: false
  },
  imageData: {
    type: String,
    required: false
  },
  template: {
    type: Number,
    default: 0
  },
  collectionName: {
    type: String,
    required: false,
    default: "no_collection"
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateMod: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Slide', slideSchema);