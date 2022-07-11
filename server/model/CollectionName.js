const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionNameSchema = new Schema({
  author: {
    type: String,
    required: false
  }, 
  collectionName: {
    type: String,
    required: false,
    default: "no_collection"
  },
  isactive: {
    type: Boolean,
    default: false,
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

module.exports = mongoose.model('CollectionName', collectionNameSchema);