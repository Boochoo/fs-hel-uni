import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.createNew(anecdote)

    dispatch({
      type: 'ADD',
      data: anecdotes,
    })
  }
}
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTE':
      return action.data

    case 'VOTE':
      const id = action.data.id
      const updatedObject = state.find((s) => s.id === id)
      const updated = { ...updatedObject, votes: updatedObject.votes + 1 }

      const newState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : updated
      )

      return newState

    case 'ADD':
      const newData = action.data

      return [...state, newData]

    default:
      return state
  }
}

export default reducer
