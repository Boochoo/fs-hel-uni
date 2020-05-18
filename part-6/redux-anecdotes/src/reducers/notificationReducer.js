const initialMessage = ''

export const showNotification = (message) => {
  return {
    type: 'NOTIFICATION',
    message,
  }
}

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.message
    case 'EMPTY':
      return action.message

    default:
      return state
  }
}

export default notificationReducer
