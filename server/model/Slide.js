const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slideSchema = new Schema({
  author: {
    type: String,
    required: true
  }, 
  title: {
    type: String,
    required: true
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
  imgName: {
    type: String,
    default: "none",
    required: false
  },
  imgData: {
    type: String,
    required: false
  },
  template: {
    type: Number,
    default: 0
  },
  collectionName: {
    type: String,
    required: true,
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