import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'
import Button from './Button'

describe('Blog', () => {
  const testBlog = {
    title: 'Bruh',
    author: 'Ermi',
    url: 'bruh.fi',
    likes: 10,
    user: {
      name: 'Ermi',
      username: 'Ermi',
    },
  }

  const { title, author, url, likes, user } = testBlog

  let component

  beforeEach(() => {
    component = render(<Blog user={user} blog={testBlog} />)
  })

  it('renders blog title and author, does not render blog url and likes number', () => {
    const blogElement = component.container.querySelector('.blog-item')

    expect(blogElement).toHaveTextContent(title)
    expect(blogElement).toHaveTextContent(author)
    expect(blogElement).not.toHaveTextContent(url)
    expect(blogElement).not.toHaveTextContent(likes)
  })

  it('when button is clicked: shows blog url and likes number', () => {
    const blogElement = component.container.querySelector('.view-button')

    fireEvent.click(blogElement)

    expect(component.container).toHaveTextContent(url)
    expect(component.container).toHaveTextContent(likes)
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
