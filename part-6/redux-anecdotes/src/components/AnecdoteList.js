import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { showNotification } from '../reducers/notificationReducer'

import './anecdote.css'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const { anecdotes, filter } = state

    const filteredAnecdotes = anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter)
    )

    return filter === '' ? anecdotes : filteredAnecdotes
  })
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    dispatch(vote(id))

    setTimeout(() => {
      dispatch(showNotification(''))
    }, 3000)
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
                dispatch(showNotification(`you have voted for '${content}'`))
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
