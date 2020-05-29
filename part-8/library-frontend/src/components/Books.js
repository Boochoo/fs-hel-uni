import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { generate as generateId } from 'shortid'

import { ALL_BOOKS } from '../graphql/queries'

const Books = () => {
  const books = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('all')

  if (books.loading) {
    return <div>Loading...</div>
  }

  if (!books.data) return null

  const filteredOutGenres = books.data.allBooks
    .map((b) => b.genres)
    .reduce((a, b) => a.concat(b), [])

  const uniqueGenres = [...new Set(filteredOutGenres)]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => {
            const filteredByGenre =
              filter === 'all' ? a : a.genres.includes(filter)
            return (
              filteredByGenre && (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author ? a.author.name : ''}</td>
                  <td>{a.published}</td>
                </tr>
              )
            )
          })}
        </tbody>
      </table>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {uniqueGenres.map((genre) => (
          <button
            style={{ flexBasis: '10%', margin: '0.5rem' }}
            key={generateId()}
            onClick={() => setFilter(genre)}
          >
            {genre}
          </button>
        ))}

        <button
          style={{ flexBasis: '10%', margin: '0.5rem' }}
          onClick={() => setFilter('all')}
        >
          all
        </button>
      </div>
    </div>
  )
}

export default Books
