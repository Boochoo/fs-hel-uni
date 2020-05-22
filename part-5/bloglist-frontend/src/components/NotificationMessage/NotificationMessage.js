import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from '@material-ui/lab'

const NotificationMessage = ({ message }) => {
  return message && <Alert>{message}</Alert>
}

NotificationMessage.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default NotificationMessage
