const { gql } = require('apollo-server')

const typeDefs = gql`
  """
  types
  """
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    booksCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    genres: [String]!
    author: Author
    id: ID!
  }

  type Subscription {
    bookAdded: Book!
  }

  """
  inputs
  """
  input loginInput {
    username: String!
    password: String!
  }

  """
  Query
  """
  type Query {
    authorsCount: Int
    booksCount: Int

    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]

    findAuthor(name: String!): Author
    findBook(title: String!): Book

    me: User
  }

  """
  Mutation
  """
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    editAuthor(name: String!, born: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`

module.exports = typeDefs
