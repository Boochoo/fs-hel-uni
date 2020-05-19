import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import Menu from './Menu'
import About from './About'
import AnecdoteList from './AnecdoteList'
import Anecdote from './Anecdote'
import CreateNew from './CreateNew'
import Footer from './Footer'

import { Alert } from 'react-bootstrap'

const intialState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1',
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2',
  },
]
const App = () => {
  const [anecdotes, setAnecdotes] = useState(intialState)
  const [notification, setNotification] = useState('')

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote '${anecdote.content}' created`)
    setTimeout(() => setNotification(''), 10000)

    let path = `/`
    history.push(path)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const match = useRouteMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.filter((anecdote) => anecdote.id === match.params.id)
    : null

  return (
    <div className='container'>
      <h1>Software anecdotes</h1>
      <Menu />

      {notification && <Alert variant='success'>{notification}</Alert>}

      <Switch>
        <Route path='/anecdote/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App
