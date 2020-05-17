import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/'

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
      <button type='submit' id='login-button'>
        login
      </button>
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
