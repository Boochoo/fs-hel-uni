import React from 'react'

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
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={() => clearForm()}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
