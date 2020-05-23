import { combineReducers } from 'redux'

import reducer, { login, notificationReducer, userReducer } from './blogReducer'

export default combineReducers({
  blogs: reducer,
  notification: notificationReducer,
  login: login,
  users: userReducer,
})
