const mongoose = require('mongoose')
const config = require('dotenv').config()

const Book = require('../model/book')
const Author = require('../model/author')

let { books, authors } = require('../data/db')

mongoose
  .connect(config.parsed.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(({ message }) => {
    console.log('error connection to MongoDB', message)
  })

mongoose.connection.once('open', (err, db) => {
  console.log('connection successfully')

  if (Author.collection || Book.collection) return null

  Author.collection.insertMany(authors, (err, docs) => {
    if (err) {
      console.log(err)
    } else {
      console.log('mulitple docs')
    }
  })
  Book.collection.insertMany(books, (err, docs) => {
    if (err) {
      console.log(err)
    } else {
      console.log('mulitple docs')
    }
  })
})
