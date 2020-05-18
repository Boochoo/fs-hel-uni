import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ createAnecdote }) => {
  const anecdoteHandler = async (event) => {
    event.preventDefault()

    let { value } = event.target.anecdote

    if (value) {
      event.target.anecdote.value = ''

      createAnecdote(value)
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

/* Simpler version: 
  passing {createAnecdote} to connect

  Alternative:
*/
const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value))
    },
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
