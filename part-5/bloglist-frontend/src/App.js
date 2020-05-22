import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'

import BlogList from './components/BlogList/'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage/'
import LoginForm from './components/LoginForm/'
import BlogForm from './components/BlogForm/'
import ButtonElement from './components/shared/ButtonElement'

import { getBlogs, create } from './redux/actions/blogActions'
import { useField } from './redux/useField'

const App = ({ getBlogs, blogs, create, notification }) => {
  const initialNewBlogData = {
    title: '',
    author: '',
    url: '',
  }
  // const [blogs, setBlogs] = useState([])
  // const username = useField('')
  // const password = useField('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogData, setBlogData] = useState(initialNewBlogData)
  const [showBlogForm, setShowBlogForm] = useState(false)

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

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
      // setNotificationMessage(response.data.error)
      // setMessageType('error')
      // setTimeout(() => setNotificationMessage(null), 3000)
    }
  }

  const { title, author, url } = blogData

  const sortByLikes = (data) =>
    data.sort((a, b) => {
      return b.likes - a.likes
    })

  const blogFormHandler = (event) => {
    event.preventDefault()
    if (!title || !author || !url) return null

    create(blogData)
    setBlogData(initialNewBlogData)
    setShowBlogForm(!showBlogForm)
  }

  const logOutUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken('')
  }

  return (
    <Container>
      <NotificationMessage message={notification} />
      {user === null && (
        <>
          <h2>Login to application</h2>
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
          <h2>Blogs</h2>
          <div>
            {user.name} logged in
            <ButtonElement text='logout' handler={() => logOutUser()} />
          </div>

          {showBlogForm && (
            <BlogForm
              handleSubmit={blogFormHandler}
              formInputHandler={({ target }) =>
                setBlogData({ ...blogData, [target.name]: target.value })
              }
            />
          )}

          <ButtonElement
            id='create-new-button'
            text={!showBlogForm ? 'create new blog' : 'cancel'}
            handler={(e) => {
              e.preventDefault()
              setShowBlogForm(!showBlogForm)
            }}
          />

          <BlogList blogs={sortByLikes(blogs)} user={user} />
        </div>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => {
  console.log({ state })
  return {
    blogs: state.blogs,
    notification: state.notification,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBlogs: () => dispatch(getBlogs()),
  create: (blog) => dispatch(create(blog)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
