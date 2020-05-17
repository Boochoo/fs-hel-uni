import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input/'

const BlogForm = ({ handleSubmit, formInputHandler }) => (
  <form onSubmit={handleSubmit}>
    <h3>Create new</h3>
    <Input inputName='title' inputHandle={formInputHandler} />
    <Input inputName='author' inputHandle={formInputHandler} />
    <Input inputName='url' inputHandle={formInputHandler} />
    <button type='submit' id='create-button'>
      Create
    </button>
  </form>
)

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formInputHandler: PropTypes.func.isRequired,
}

export default BlogForm
