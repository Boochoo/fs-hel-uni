import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

// import './anecdote.css'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log(state)
    const { anecdotes, filter } = state

    const filteredAnecdotes = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter)
    )

    return filter === '' ? anecdotes : filteredAnecdotes
  })
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    dispatch(vote(id))
  }

  return (
    <div className='container'>
      {anecdotes.map(({ id, content, votes }) => (
        <div key={id} className='grid-item'>
          <div>{content}</div>
          <div>
            has {votes}
            <button
              onClick={() => {
                voteHandler(id)
                dispatch(setNotification(`you have voted for '${content}'`, 2))
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
