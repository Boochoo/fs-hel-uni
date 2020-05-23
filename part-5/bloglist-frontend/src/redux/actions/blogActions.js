import blogsService from '../../services/blogs'
import loginService from '../../services/login'
import userService from '../../services/users'

import {
  GET_BLOGS,
  CREATE_BLOG,
  NOTIFICATION,
  DELETE_BLOG,
  LOGIN,
  GET_TOKEN,
  LOG_OUT,
  CLEAR_FORM,
  USERS,
  ADD_COMMENT,
} from './types'
import { loadAuth, setAuth, removeAuth } from '../auth'

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

export const initWithToken = () => {
  return async (dispatch) => {
    const userData = loadAuth()

    if (userData) {
      blogsService.setToken(userData.token)
    } else {
      blogsService.setToken('')
    }

    dispatch({
      type: GET_TOKEN,
      payload: userData,
    })
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const userData = await loginService.login(user)

      setAuth(userData)

      dispatch({
        type: LOGIN,
        payload: userData,
      })
    } catch (error) {
      if (!user.username || !user.password) {
        dispatch({
          type: NOTIFICATION,
          notification: 'Username and password need to be filled',
        })
      } else {
        dispatch({
          type: NOTIFICATION,
          notification: error.message,
        })
      }
    }

    setTimeout(() => {
      dispatch({
        type: NOTIFICATION,
        notification: '',
      })
    }, 2000)
  }
}

export const clearLoginToken = () => {
  return async (dispatch) => {
    await blogsService.setToken('')

    removeAuth()

    dispatch({
      type: LOG_OUT,
      payload: null,
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

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: USERS,
      payload: users,
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
