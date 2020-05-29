import React, { useEffect } from 'react'

import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../graphql/queries'

const Recommended = ({ user }) => {
  const { favoriteGenre } = user.data.me
  const [getRecommendations, { loading, data }] = useLazyQuery(
    ALL_BOOKS_BY_GENRE
  )

  useEffect(() => {
    if (!user || !user.data || !user.data.me) return null

    getRecommendations({
      variables: { genre: favoriteGenre },
    })
  }, [getRecommendations, favoriteGenre, user])

  if (loading) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {favoriteGenre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data &&
            data.allBooks &&
            data.allBooks.map((a) => {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author ? a.author.name : ''}</td>
                  <td>{a.published}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
