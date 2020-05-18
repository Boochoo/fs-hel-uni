import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }
  return message && <div style={style}>{message}.</div>
}

const mapStateToProps = ({ notification }) => {
  const { message } = notification
  return {
    message,
  }
}

export default connect(mapStateToProps)(Notification)
