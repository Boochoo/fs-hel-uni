const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    minlength: 6,
  },
  favoriteGenre: {
    type: String,
  },
})

module.exports = mongoose.model('User', schema)
