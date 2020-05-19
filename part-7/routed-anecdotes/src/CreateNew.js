import React from 'react'
import { Form, Button } from 'react-bootstrap'

import { useField } from './hooks/userField'

const CreateNew = ({ addNew }) => {
  const { clear: clearContent, ...content } = useField('text')
  const { clear: clearAuthor, ...author } = useField('text')
  const { clear: clearInfo, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()

    const contentValue = content.value
    const authorValue = author.value
    const infoValue = info.value
    const isValid =
      contentValue !== '' && authorValue !== '' && infoValue !== ''

    if (!isValid) return

    addNew({
      content: contentValue,
      author: authorValue,
      info: infoValue,
      votes: 0,
    })
  }

  const clearForm = () => {
    clearContent()
    clearAuthor()
    clearInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> content</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label> author</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label> url for more info</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <Button type='submit'>create</Button>
        <Button type='button' onClick={() => clearForm()}>
          reset
        </Button>
      </Form>
    </div>
  )
}

export default CreateNew
