import React from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

import Input from '../Input/'

const BlogForm = ({ handleSubmit, formInputHandler }) => (
  <form onSubmit={handleSubmit}>
    <h3>Create new</h3>
    <Input inputName='title' inputHandle={formInputHandler} />
    <Input inputName='author' inputHandle={formInputHandler} />
    <Input inputName='url' inputHandle={formInputHandler} />
    <Button
      variant='contained'
      color='primary'
      type='submit'
      id='create-button'
      style={{ marginTop: 10 }}
    >
      Create
    </Button>
  </form>
)

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formInputHandler: PropTypes.func.isRequired,
}

export default BlogForm
