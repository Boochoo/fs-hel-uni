export const filterByKeyword = (keyword) => {
  return {
    type: 'SET_FILTER',
    keyword,
  }
}
const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.keyword.toLowerCase()

    default:
      return state
  }
}

export default filterReducer
