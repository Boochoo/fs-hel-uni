import {
  GET_BLOGS,
  CREATE_BLOG,
  NOTIFICATION,
  DELETE_BLOG,
} from '../actions/types'

export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case NOTIFICATION:
      return action.notification

    default:
      return state
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return action.payload

    case CREATE_BLOG:
      console.log([...state, action.payload])
      return [...state, action.payload]

    case DELETE_BLOG:
      return state.filter((blog) => blog.id !== action.payload)

    default:
      return state
  }
}

export default blogReducer
