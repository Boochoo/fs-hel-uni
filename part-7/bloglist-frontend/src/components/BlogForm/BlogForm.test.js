import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

test('form sends correct details', () => {
  const mockFormHandler = jest.fn()
  const blogData = {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'test-blog.url',
  }
  const { container } = render(
    <BlogForm handleSubmit={mockFormHandler} formInputHandler={() => {}} />
  )

  const getElement = (selectorName) =>
    container.querySelector(`input[name=${selectorName}]`)

  const addValue = (elem, value) => {
    fireEvent.change(elem, {
      target: { value: blogData[value] },
    })
  }

  const titleElem = getElement('title')
  const authorElem = getElement('author')
  const urlElem = getElement('url')
  const form = container.querySelector('form')

  addValue(titleElem, 'title')
  addValue(authorElem, 'author')
  addValue(urlElem, 'url')

  fireEvent.submit(form)

  expect(mockFormHandler.mock.calls.length).toBe(1)
})
