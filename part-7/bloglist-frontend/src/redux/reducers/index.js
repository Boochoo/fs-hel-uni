import { combineReducers } from 'redux'

import blogReducer from './blogReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: userReducer,
})
