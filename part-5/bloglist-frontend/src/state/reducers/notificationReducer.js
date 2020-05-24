import { NOTIFICATION } from '../actions/types'

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case NOTIFICATION:
      return action.notification

    default:
      return state
  }
}

export default notificationReducer
