import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS } from '../graphql/queries'
import { EDIT_AUTHOR } from '../graphql/mutations'

const Authors = () => {
  const [birthYear, setBirthYear] = useState('')
  const [author, setAuthor] = useState('')
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (authors.loading) return <div>Loading...</div>
  const options = (data) =>
    data.map(({ name }) => ({
      value: name,
      label: name,
    }))
  if (!authors.data) return null
  const allAuthors = authors.data.allAuthors

  const onSetBirthDate = (event) => {
    event.preventDefault()
    if (birthYear && author) {
      editAuthor({
        variables: {
          name: author,
          born: Number(birthYear),
        },
      })

      setBirthYear('')
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={onSetBirthDate}>
        <h3>Set birthyear</h3>
        <Select
          options={options(allAuthors)}
          onChange={(selected) => {
            setAuthor(selected.value)
          }}
        />

        <div style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
          <label htmlFor='birth-year' style={{ marginRight: '0.5rem' }}>
            birth year
          </label>
          <input
            id='birth-year'
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>Edit birthyear</button>
      </form>
    </div>
  )
}

export default Authors
