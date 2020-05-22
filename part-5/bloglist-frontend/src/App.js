import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'

import BlogList from './components/BlogList/'
import NotificationMessage from './components/NotificationMessage/'
import LoginForm from './components/LoginForm/'
import BlogForm from './components/BlogForm/'
import ButtonElement from './components/shared/ButtonElement'

import {
  getBlogs,
  initWithToken,
  clearLoginToken,
} from './redux/actions/blogActions'

const App = ({
  getBlogs,
  blogs,
  notification,
  initWithToken,
  user,
  removeToken,
}) => {
  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    initWithToken()
  }, [initWithToken])

  const sortByLikes = (data) =>
    data.sort((a, b) => {
      return b.likes - a.likes
    })

  const onLogOut = () => removeToken()

  return (
    <Container>
      <NotificationMessage message={notification} />
      {!user.userData && <LoginForm />}

      {user.userData && (
        <div>
          <h2>Blogs</h2>
          <div>
            {user.userData.name} logged in
            <ButtonElement text='logout' handler={onLogOut} />
          </div>

          <BlogForm />

          <BlogList blogs={sortByLikes(blogs)} user={user} />
        </div>
      )}
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.login,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBlogs: () => dispatch(getBlogs()),
  initWithToken: () => dispatch(initWithToken()),
  removeToken: () => dispatch(clearLoginToken()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
