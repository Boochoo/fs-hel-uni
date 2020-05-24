import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import styled from 'styled-components'

import ButtonElement from '../components/shared/ButtonElement'

import { clearLoginToken } from '../state/actions/loginActions'

const MainContainer = styled('div')`
  .menu-item {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const MenuBar = ({ removeToken, user }) => {
  const onLogOut = () => removeToken()
  return (
    <AppBar position='static'>
      <Toolbar>
        <MainContainer>
          <Grid container spacing={3} alignItems='center'>
            <Grid item>
              <Link to='/blogs' className='menu-item'>
                Blogs
              </Link>
            </Grid>
            <Grid item>
              <Link to='/users' className='menu-item'>
                Users
              </Link>
            </Grid>

            <Grid item>{user.userData.name} logged in</Grid>
            <Grid item>
              <ButtonElement text='logout' handler={onLogOut} />
            </Grid>
          </Grid>
        </MainContainer>
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
