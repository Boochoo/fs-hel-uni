const { ApolloServer } = require('apollo-server')

const config = require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { v1: uuid } = require('uuid')

const typeDefs = require('./api/schema')
const resolvers = require('./api/resolvers')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const User = require('./model/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(({ message }) => {
    console.log('error connection to MongoDB', message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
