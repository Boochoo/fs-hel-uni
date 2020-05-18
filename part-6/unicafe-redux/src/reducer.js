const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  const { good, ok, bad } = state
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: good + 1 }
    case 'OK':
      return { ...state, ok: ok + 1 }
    case 'BAD':
      return { ...state, bad: bad + 1 }
    case 'ZERO':
      return { ...initialState }
    default:
      return state
  }
}

export default counterReducer
