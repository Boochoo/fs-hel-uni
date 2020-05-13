const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs.js')
const logger = require('./utils/logger')

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

logger.info('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
