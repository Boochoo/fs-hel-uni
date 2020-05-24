import {
  GET_BLOGS,
  CREATE_BLOG,
  DELETE_BLOG,
  CLEAR_FORM,
  ADD_COMMENT,
  UPDATE_BLOG,
} from '../actions/types'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return action.payload

    case CREATE_BLOG:
      return [...state, action.payload]

    case UPDATE_BLOG:
      return [...state, action.payload]

    case DELETE_BLOG:
      return state.filter((blog) => blog.id !== action.payload)

    case ADD_COMMENT:
      const currentBlogId = action.payload.id
      const updatedBlogs = state.filter((blog) =>
        blog.id !== currentBlogId ? blog : action.payload
      )

      return updatedBlogs

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

export default blogReducer
