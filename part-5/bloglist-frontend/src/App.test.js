import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'

import App from './App'

it('renders', async () => {
  const component = render(<App />)

  await waitForElement(() => component.getByText('Login to application'))

  expect(component.container).toHaveTextContent('username')
  expect(component.container).toHaveTextContent('password')
})
