import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from '@material-ui/lab'

const NotificationMessage = ({ message, type }) => {
  if (!message) return null

  return (
    <Alert className={`message ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </Alert>
  )
}

NotificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default NotificationMessage
