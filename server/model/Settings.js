const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  autoAdv: {
    type: Boolean,
    required: false
  }, 
  advSpeed: {
    type: Number,
    required: false
  },
  transition: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Settings', settingsSchema);