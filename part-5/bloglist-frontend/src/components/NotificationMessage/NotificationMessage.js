import React from 'react'
import PropTypes from 'prop-types'

const NotificationMessage = ({ message, type }) => {
  if (!message) return null

  return (
    <div className={`message ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

NotificationMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default NotificationMessage
