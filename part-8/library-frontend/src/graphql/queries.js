import { gql } from '@apollo/client'

export const BOOKS_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    published
    author {
      name
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOKS_DETAILS}
`

export const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String! = "") {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOKS_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`

export const USER = gql`
  query me {
    me {
      favoriteGenre
    }
  }
`
