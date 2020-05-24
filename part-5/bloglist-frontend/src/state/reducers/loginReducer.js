import { GET_TOKEN, LOGIN, LOG_OUT } from '../actions/types'

export const loginReducer = (state = {}, action) => {
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

export default loginReducer
