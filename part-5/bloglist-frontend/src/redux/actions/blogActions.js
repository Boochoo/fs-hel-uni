import blogsService from '../../services/blogs'
import { GET_BLOGS, CREATE_BLOG, NOTIFICATION, DELETE_BLOG } from './types'

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

export const create = (blog) => {
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
