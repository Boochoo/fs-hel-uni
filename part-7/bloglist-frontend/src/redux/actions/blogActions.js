import blogsService from '../../services/blogs'

import {
  GET_BLOGS,
  CREATE_BLOG,
  NOTIFICATION,
  DELETE_BLOG,
  CLEAR_FORM,
  ADD_COMMENT,
  UPDATE_BLOG,
} from './types'

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogsService.getAll()

      dispatch({
        type: GET_BLOGS,
        payload: blogs,
      })
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        notification: error.message,
      })
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogData = await blogsService.create(blog)

      dispatch({
        type: CREATE_BLOG,
        payload: blogData,
      })

      dispatch({
        type: NOTIFICATION,
        notification: `a new blog ${blogData.title} by ${blogData.author} added`,
      })
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        notification: error.message,
      })
    }
    setTimeout(() => {
      dispatch({
        type: NOTIFICATION,
        notification: '',
      })
    }, 2000)
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blog.id)

      dispatch({
        type: DELETE_BLOG,
        payload: blog.id,
      })

      dispatch({
        type: NOTIFICATION,
        notification: `blog '${blog.title}' has been deleted`,
      })
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: NOTIFICATION,
          notification: '',
        })
      }, 2000)
    }

    setTimeout(() => {
      dispatch({
        type: NOTIFICATION,
        notification: '',
      })
    }, 2000)
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogsService.update(id, updatedBlog)

    dispatch({
      type: UPDATE_BLOG,
      payload: blog,
    })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogsService.addComment(id, comment)

    dispatch({
      type: ADD_COMMENT,
      payload: blog,
    })
  }
}

export const clearForm = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_FORM,
    })
  }
}
