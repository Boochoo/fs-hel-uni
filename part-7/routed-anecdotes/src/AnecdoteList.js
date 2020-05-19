import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map((anecdote) => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default AnecdoteList
