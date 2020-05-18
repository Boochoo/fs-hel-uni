export const setNotification = (message, time) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'EMPTY',
      })
    }, time * 1000)

    dispatch({
      type: 'NOTIFICATION',
      message: message,
      timer: timer,
    })
  }
}

const initialMessage = { message: '', timer: null }

const notificationReducer = (state = initialMessage, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      if (state.timer) {
        clearTimeout(state.timer)
      }
      return {
        message: action.message,
        timer: action.timer,
      }
    case 'EMPTY':
      return initialMessage

    default:
      return state
  }
}

export default notificationReducer
