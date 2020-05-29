import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import Notify from './components/Notify'
import Menu from './components/Menu'

import { ALL_AUTHORS, ALL_BOOKS, USER } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscriptions'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const userDetails = useQuery(USER)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...dataInStore.allBooks, addedBook] },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      console.log(bookAdded)
      notify(`${bookAdded.title} by ${bookAdded.author.name} added`)
      updateCacheWith(bookAdded)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (result.loading) return <div>Loading...</div>

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    client.clearStore()
  }

  if (token && page === 'login') setPage('books')

  return (
    <div>
      {/* <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>Recommended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div> */}

      <Menu onMenuClick={setPage} token={token} logOutHandler={logout} />

      <Notify errorMessage={errorMessage} />

      {page === 'authors' && <Authors />}

      {page === 'books' && <Books />}

      {page === 'add' && (
        <NewBook setError={notify} updateCacheWith={updateCacheWith} />
      )}

      {page === 'login' && !token && (
        <LoginForm setToken={setToken} setError={notify} />
      )}

      {page === 'recommended' && <Recommended user={userDetails} />}
    </div>
  )
}

export default App
