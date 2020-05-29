import { gql } from '@apollo/client'

import { BOOKS_DETAILS } from './queries'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOKS_DETAILS}
`
