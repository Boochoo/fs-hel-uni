const anecdotesAtStart = [
  { content: 'If it hurts, do it more often', votes: 0 },
  {
    content: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    content:
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  { content: 'Premature optimization is the root of all evil.', votes: 0 },
  {
    content:
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = ({ content, votes }) => {
  return {
    content: content,
    votes: votes,
    id: getId(),
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const createAnecdote = (anecdote) => {
  return {
    type: 'ADD',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0,
    },
  }
}
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id },
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
