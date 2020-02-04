const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false,
    trim: false
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: false
  },
  mobileno: {
    type: Number,
    required: false
  },
  city: {
    type: String,
    required: false,
    trim: false
  }
})

const user = mongoose.model("user", userSchema);
module.exports = user;