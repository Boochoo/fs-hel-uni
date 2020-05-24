import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import BlogList from './components/BlogList/'
import BlogLinkList from './components/BlogList/BlogLinkList'
import LoginForm from './components/LoginForm/'
import NotificationMessage from './components/NotificationMessage/'
import { sortByKey } from './utils/utils'

import Blogs from './views/Blogs'
import MenuBar from './views/MenuBar'
import Users from './views/Users'
import User from './views/User'

import { getBlogs } from './state/actions/blogActions'
import { initWithToken } from './state/actions/loginActions'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`

const App = ({ getBlogs, blogs, notification, initWithToken, user }) => {
  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    initWithToken()
  }, [initWithToken])

  return (
    <Container>
      <NotificationMessage message={notification} />
      {!user.userData && <LoginForm />}
      {user.userData && (
        <div>
          <MenuBar />
          <h2>Blog app</h2>

          <Switch>
            <Route path='/blogs/:id' component={Blogs} />
            <Route path='/blogs'>
              <BlogList blogs={sortByKey(blogs, 'likes')} user={user} />
            </Route>
            <Route path='/users/:id' component={User} />
            <Route path='/users' component={Users} />
            <Route path='/'>
              <BlogLinkList blogs={sortByKey(blogs, 'likes')} />
            </Route>
          </Switch>
        </div>
      )}
      <GlobalStyle />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
