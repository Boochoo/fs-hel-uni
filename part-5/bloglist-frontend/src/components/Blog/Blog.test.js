import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'
import Button from './Button'

describe('Blog', () => {
  const user = {
    username: 'Ermi',
  }

  const blog = {
    author: 'Dr. Ermi',
    likes: 10,
    title: 'Bruh',
    url: 'bruh.fi',
    user: {
      name: 'Ermi',
      username: 'Ermi',
    },
  }

  let component

  beforeEach(() => {
    component = render(<Blog user={user} blog={blog} />)
  })

  it('renders blog title and author', () => {
    const blogElement = component.container.querySelector('.blog-item')

    expect(blogElement).toHaveTextContent('Bruh')
    expect(blogElement).toHaveTextContent('Dr. Ermi')
  })

  it('does not render blog url and likes number', () => {
    expect(component.container).not.toHaveTextContent('bruh.fi')
    expect(component.container).not.toHaveTextContent('10')
  })

  it('when button is clicked: shows blog url and likes number', () => {
    const blogElement = component.container.querySelector('.is-hidden')

    fireEvent.click(blogElement)

    expect(component.container).toHaveTextContent('bruh.fi')
    expect(component.container).toHaveTextContent('10')
  })

  it('clicking the button calls event handler twice', async () => {
    const mockButton = jest.fn()

    const blogComp = render(<Button handler={mockButton} />)
    const likeButton = blogComp.container.querySelector('.like-button')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockButton.mock.calls).toHaveLength(2)
  })
})
