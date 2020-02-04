const mongoose = require('mongoose');

const userSchema1 = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: false
  }
})

const users = mongoose.model("userSign", userSchema1);
module.exports = users;