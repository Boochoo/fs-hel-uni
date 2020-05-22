import { combineReducers } from 'redux'

import reducer, { login, notificationReducer } from './blogReducer'

export default combineReducers({
  blogs: reducer,
  notification: notificationReducer,
  login: login,
})
