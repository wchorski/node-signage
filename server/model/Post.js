const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    required: true
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

module.exports = mongoose.model('Post', postSchema);