import { combineReducers } from 'redux'

import reducer, { notificationReducer } from './blogReducer'

export default combineReducers({
  blogs: reducer,
  notification: notificationReducer,
})
