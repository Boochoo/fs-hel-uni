const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    booksCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    authorsCount: Int
    allAuthors: [Author]
    findAuthor(name: String!): Author

    booksCount: Int
    allBooks(author: String, genre: String): [Book]
    findBook(title: String!): Book
  }

  type Mutation {
    addAuthor(name: String!, id: ID, born: Int): Author

    addBook(
      title: String!
      published: Int!
      author: String!
      id: ID
      genres: [String!]!
    ): Book

    editAuthor(name: String!, born: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorsCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) => authors.find((a) => a.name === args.name),

    booksCount: () => books.length,
    allBooks: (root, args) => {
      if (JSON.stringify(args) === '{}') return books

      const byAuthor = (book) => book.author === args.author
      const byGenre = (book) => book.genre.includes(args.genre)

      return args.author ? books.filter(byAuthor) : books.filter(byGenre)
    },
    findBook: (root, args) => books.find((a) => a.title === args.title),
  },
  Author: {
    booksCount: (root) => {
      const byName = books.filter((b) => b.author === root.name)

      return byName.length
    },
  },
  Mutation: {
    addAuthor: (root, args) => {
      if (authors.find((a) => a.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }

      const author = { ...args, id: uuid() }

      authors = authors.concat(author)

      return author
    },
    addBook: (root, args) => {
      if (books.find((a) => a.title === args.title)) {
        throw new UserInputError('Title must be unique', {
          invalidArgs: args.title,
        })
      }

      const book = { ...args, id: uuid() }

      books = books.concat(book)

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)

      if (!author) return null

      const updatedAuthor = { ...author, born: args.born }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))

      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
