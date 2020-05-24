import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import App from './App'

it('renders', async () => {
  const { container } = render(<App />)

  expect(container).toHaveTextContent('Login to application')
  expect(container).toHaveTextContent('username')
  expect(container).toHaveTextContent('password')
})
