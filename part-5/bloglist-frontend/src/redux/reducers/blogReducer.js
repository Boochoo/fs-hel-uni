import {
  GET_BLOGS,
  CREATE_BLOG,
  NOTIFICATION,
  DELETE_BLOG,
  GET_TOKEN,
  LOGIN,
  LOG_OUT,
  CLEAR_FORM,
} from '../actions/types'

export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case NOTIFICATION:
      return action.notification

    default:
      return state
  }
}

const initialNewBlogData = {
  title: '',
  author: '',
  url: '',
}

export const clearForm = (state = initialNewBlogData, action) => {
  switch (action.type) {
    case CLEAR_FORM:
      return initialNewBlogData

    default:
      return state
  }
}

export const login = (state = {}, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        userData: action.payload,
      }
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      }
    case LOG_OUT:
      return {
        ...state,
        userData: action.payload,
      }
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
