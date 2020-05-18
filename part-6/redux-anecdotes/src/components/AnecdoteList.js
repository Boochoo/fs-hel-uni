import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, vote, setNotification }) => {
  return (
    <div className='container'>
      {anecdotes &&
        anecdotes.map(({ id, content, votes }) => (
          <div key={id} className='grid-item'>
            <div>{content}</div>
            <div>
              has {votes}
              <button
                onClick={() => {
                  vote(id)
                  setNotification(`you have voted for '${content}'`, 2)
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

const mapStateToProps = (state) => {
  const { anecdotes, filter } = state
  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter)
  )

  return {
    anecdotes: filter === '' ? anecdotes : filteredAnecdotes,
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
