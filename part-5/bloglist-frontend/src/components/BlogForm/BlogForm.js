import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

import { create, clearForm } from '../../redux/actions/blogActions'

import { useField } from '../../redux/utils/useField'
import { compose } from '../../redux/utils/utils'

import ButtonElement from '../shared/ButtonElement'

const BlogForm = ({ create }) => {
  const { reset: resetTitle, ...title } = useField('title')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetUrl, ...url } = useField('url')

  const [formVisibility, setFormVisibility] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    create({ title: title.value, author: author.value, url: url.value })

    if (!title.value || !author.value || !url.value) return null

    compose(resetTitle, resetAuthor, resetUrl)
    setFormVisibility(!formVisibility)
  }

  return (
    <>
      {formVisibility && (
        <form onSubmit={handleSubmit}>
          <h3>Create new</h3>
          <div>
            <TextField {...title} />
          </div>
          <div>
            <TextField {...author} />
          </div>
          <div>
            <TextField {...url} />
          </div>
          <Button
            variant='contained'
            type='submit'
            id='create-button'
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            Create
          </Button>
        </form>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <ButtonElement
          id='create-new-button'
          text={!formVisibility ? 'create new blog' : 'cancel'}
          handler={(e) => {
            e.preventDefault()
            setFormVisibility(!formVisibility)
          }}
        />
      </div>
    </>
  )
}

BlogForm.propTypes = {
  create: PropTypes.func.isRequired,
  // formHandler: PropTypes.func.isRequired,
}

export default connect(null, { create, clearForm })(BlogForm)
