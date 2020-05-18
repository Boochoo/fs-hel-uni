import React from 'react'
import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const anecdoteHandler = (event) => {
    event.preventDefault()
    let { value } = event.target.anecdote

    if (value) {
      dispatch(createAnecdote(value))

      event.target.anecdote.value = ''
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={anecdoteHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
