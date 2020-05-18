import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }
  const testRunner = (type, changedState) => {
    const action = {
      type,
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(changedState)
  }

  test('should return a proper initial state when called with undefined state', () => {
    // const state = {}
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    testRunner('GOOD', {
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    testRunner('OK', {
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    testRunner('BAD', {
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('bad is incremented', () => {
    testRunner('ZERO', {
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
