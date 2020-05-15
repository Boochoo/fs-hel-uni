import React from 'react'

const NotificationMessage = ({ message, type }) => {
  if (!message) return null

  return (
    <div className={`message ${type === 'error' ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default NotificationMessage
