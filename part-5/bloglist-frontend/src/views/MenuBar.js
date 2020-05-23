import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Grid } from '@material-ui/core'

import ButtonElement from '../components/shared/ButtonElement'

import { clearLoginToken } from '../redux/actions/blogActions'

const MenuBar = ({ removeToken, user }) => {
  const onLogOut = () => removeToken()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container spacing={3} alignItems='center'>
          <Grid item>
            <Link
              to='/blogs'
              style={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Blogs
            </Link>
          </Grid>
          <Grid item>
            <Link
              to='/users'
              style={{
                color: 'white',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Users
            </Link>
          </Grid>

          <Grid item>{user.userData.name} logged in</Grid>
          <Grid item>
            <ButtonElement text='logout' handler={onLogOut} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => ({
  user: state.login,
})

const mapDispatchToProps = (dispatch) => ({
  removeToken: () => dispatch(clearLoginToken()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
