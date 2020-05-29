const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const Book = require('../model/book')
const Author = require('../model/author')
const User = require('../model/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

module.exports = {
  Query: {
    authorsCount: async () => {
      const count = await Author.countDocuments()

      return count
    },
    booksCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const hasNoArgs = JSON.stringify(args) === '{}'
      const { author, genre } = args

      if (hasNoArgs) {
        return Book.find({})
      }

      if (author && genre) {
        const requestedAuthor = await Author.findOne({ name: author })

        return Book.find({
          author: requestedAuthor._id,
          genres: { $in: genre },
        })
      } else if (genre) {
        return Book.find({ genres: { $in: genre } })
      } else if (author) {
        const requestedAuthor = await Author.findOne({ name: author })

        return Book.find({ author: requestedAuthor._id })
      }
    },
    allAuthors: () => {
      return Author.find({})
    },
    findAuthor: (root, args) => {
      return Author.findOne({ name: args.name })
    },
    findBook: async (root, { title }) => await Book.find({ title }),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    booksCount: async ({ name }) => {
      const booksList = await Book.find({
        author: await Author.findOne({ name: name }),
      })

      return booksList.length
    },
  },
  Book: {
    author: async (book) => {
      const id = book.author ? book.author : book._id

      return await Author.findById(id)
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) throw new AuthenticationError('not authenticated')

      const authorDetails = await Author.findOne({ name: args.author })

      if (authorDetails) {
        const updateBook = new Book({ ...args, author: authorDetails })

        try {
          pubsub.publish('BOOK_ADDED', { bookAdded: updateBook })
          return updateBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        const newAuthor = await new Author({ name: args.author, born: null })
        const newBook = await new Book({ ...args, author: newAuthor })

        try {
          await newAuthor.save()
          await newBook.save()

          pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

          return newBook
        } catch ({ message }) {
          throw new UserInputError(message, {
            invalidArgs: args,
          })
        }
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new UserInputError('Unauthorised')
      }

      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.born
        await author.save()

        return author
      } catch ({ message }) {
        throw new UserInputError(message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({
        username,
        favoriteGenre,
      })

      return user.save().catch(({ message }) => {
        throw new UserInputError(message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'password') {
        throw new UserInputError('wrong creds')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}
