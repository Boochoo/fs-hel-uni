import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
const dispatchAction = (type) => store.dispatch({ type })

const App = () => {
  const { good, ok, bad } = store.getState()
  return (
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        textAlign: 'center',
        marginTop: '3.5rem',
        fontSize: '1.5rem',
      }}
    >
      <button onClick={() => dispatchAction('GOOD')}>good</button>
      <button onClick={() => dispatchAction('OK')}>neutral</button>
      <button onClick={() => dispatchAction('BAD')}>bad</button>
      <button onClick={() => dispatchAction('ZERO')}>reset stats</button>

      <div>good {good}</div>
      <div>neutral {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
