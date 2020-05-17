import React, { useState, useEffect } from 'react'

import './App.css'

import Blog from './components/Blog/'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage/'
import LoginForm from './components/LoginForm/'
import BlogForm from './components/BlogForm/'

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
  const [showBlogForm, setShowBlogForm] = useState(false)

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

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
      setNotificationMessage(response.data.error)
      setMessageType('error')
      setTimeout(() => setNotificationMessage(null), 3000)
    }
  }

  const { title, author, url } = blogData

  const sortByLikes = (data) =>
    data.sort((a, b) => {
      return b.likes - a.likes
    })

  const blogFormHandler = (event) => {
    event.preventDefault()

    blogService
      .create(blogData)
      .then((res) => {
        setBlogs(blogs.concat(res))
        setBlogData(initialNewBlogData)

        setNotificationMessage(`a new blog ${title} by ${author} added`)
        setMessageType('success')
        setShowBlogForm(!showBlogForm)
        setTimeout(() => setNotificationMessage(null), 3000)
      })
      .catch((error) => {
        if (!title || !author || !url) {
          setNotificationMessage('title, author or url should not be empty!')
        } else {
          setNotificationMessage(error.message)
        }
        setMessageType('error')
        setTimeout(() => setNotificationMessage(null), 3000)
      })
  }

  console.log(blogs, user)

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken('')
  }

  const blogRemoveHandler = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)

      const blogsAfterDeletion = await blogService.getAll()

      setBlogs(blogsAfterDeletion)
    }
  }

  return (
    <div>
      {user === null ? <h2>Login to application</h2> : <h2>Blogs</h2>}
      <NotificationMessage message={notificationMessage} type={messageType} />
      {user === null && (
        <>
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            usernameHandler={({ target }) => setUsername(target.value)}
            passwordHandler={({ target }) => setPassword(target.value)}
          />
        </>
      )}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button type='submit' onClick={() => logOutUser()}>
            logout
          </button>

          {showBlogForm && (
            <BlogForm
              handleSubmit={blogFormHandler}
              formInputHandler={({ target }) =>
                setBlogData({ ...blogData, [target.name]: target.value })
              }
            />
          )}

          <div>
            <button
              id='create-new-button'
              type='submit'
              onClick={(e) => {
                e.preventDefault()
                setShowBlogForm(!showBlogForm)
              }}
            >
              {!showBlogForm ? 'create new blog' : 'cancel'}
            </button>
          </div>

          <div className='blogs-wrapper'>
            {sortByLikes(blogs).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                deleteHandler={blogRemoveHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
