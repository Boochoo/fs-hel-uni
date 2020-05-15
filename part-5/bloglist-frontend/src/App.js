import React, { useState, useEffect } from 'react'

import './App.css'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'

const App = () => {
  const initialNewBlogData = {
    title: '',
    author: '',
    url: '',
  }
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogData, setBlogData] = useState(initialNewBlogData)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      console.log({ user })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
      setNotificationMessage(response.data.error)
      setMessageType('error')

      setTimeout(() => setNotificationMessage(null), 3000)

      /* setTimeout(() => {
        console.log('object')
      }, 3000) */
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <NotificationMessage message={notificationMessage} type={messageType} />
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleCreateNew = (event) => {
    event.preventDefault()

    console.log(blogData)

    blogService.create(blogData).then((res) => {
      setBlogs(blogs.concat(res))
      setBlogData(initialNewBlogData)

      setNotificationMessage(
        `a new blog ${blogData.title} by ${blogData.author} added`
      )
      setMessageType('success')

      setTimeout(() => setNotificationMessage(null), 3000)
    })
  }

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      <NotificationMessage message={notificationMessage} type={messageType} />
      <p>{user.name} logged in</p>
      <button type='submit' onClick={() => logOutUser()}>
        logout
      </button>

      <h3>Create new</h3>
      <form onSubmit={handleCreateNew}>
        <div>
          title
          <input
            type='text'
            value={blogData.title}
            name='title'
            onChange={({ target }) =>
              setBlogData({ ...blogData, [target.name]: target.value })
            }
          />
        </div>
        <div>
          Author
          <input
            type='text'
            value={blogData.author}
            name='author'
            onChange={({ target }) =>
              setBlogData({ ...blogData, [target.name]: target.value })
            }
          />
        </div>
        <div>
          Url
          <input
            type='text'
            value={blogData.url}
            name='url'
            onChange={({ target }) =>
              setBlogData({ ...blogData, [target.name]: target.value })
            }
          />
        </div>
        <button type='submit'>Create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken('')
  }

  return (
    <div>
      {user === null && loginForm()}

      {user && blogForm()}
    </div>
  )
}

export default App
