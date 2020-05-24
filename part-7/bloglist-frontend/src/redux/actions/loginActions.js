import loginService from '../../services/login'
import blogsService from '../../services/blogs'
import userService from '../../services/users'

import { loadAuth, setAuth, removeAuth } from '../auth'

import { GET_USERS, NOTIFICATION, LOGIN, GET_TOKEN, LOG_OUT } from './types'

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

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: GET_USERS,
      payload: users,
    })
  }
}
