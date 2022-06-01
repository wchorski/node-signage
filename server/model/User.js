const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
      type: String,
      required: true
  },
  roles: {
      User: {
          type: Number,
          default: 2001
      },
      Editor: Number,
      Admin: Number
  },
  password: {
      type: String,
      required: true
  },
  refreshToken: String
});

module.exports = mongoose.model('User', userSchema);