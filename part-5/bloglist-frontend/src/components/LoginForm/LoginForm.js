import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import Input from '../Input/'
// import { useField } from '../../redux/useField'

const LoginForm = ({
  handleSubmit,
  usernameHandler,
  passwordHandler,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        inputName='username'
        value={username}
        inputHandle={usernameHandler}
      />
      <Input
        inputName='password'
        value={password}
        inputHandle={passwordHandler}
      />
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
  handleSubmit: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
