import React from 'react'
import { Link } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  const { content, votes, info } = anecdote[0]
  return (
    <div>
      <h2>{content}</h2>
      <p>has {votes} votes</p>
      <p>
        for more info see <Link to={`${info}`}>{info}</Link>{' '}
      </p>
    </div>
  )
}

export default Anecdote
