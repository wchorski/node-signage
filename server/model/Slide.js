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