import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'

import { loginUser } from '../../redux/actions/blogActions'
import { useField } from '../../redux/utils/useField'
import { compose } from '../../redux/utils/utils'

const LoginForm = ({ loginUser }) => {
  const { reset: resetUsername, ...username } = useField('username')
  const { reset: resetPassword, ...password } = useField('password', 'password')

  const handleSubmit = (event) => {
    event.preventDefault()

    loginUser({
      username: username.value,
      password: password.value,
    })

    if (username.value && password.value) {
      compose(resetUsername, resetPassword)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to application</h2>
      <div>
        <TextField {...username} />
      </div>

      <div>
        <TextField {...password} autoComplete='off' />
      </div>
      <Button
        variant='outlined'
        color='primary'
        type='submit'
        id='login-button'
        style={{ marginTop: '1.25rem' }}
      >
        login
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.login,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
