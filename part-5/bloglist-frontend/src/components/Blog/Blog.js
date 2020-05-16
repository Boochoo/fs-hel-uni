import React, { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../../services/blogs'
import Button from './Button'

const Blog = ({ blog, user, deleteHandler }) => {
  const { title, author, likes, url, id } = blog

  const [show, setShow] = useState(false)
  const [like, setLike] = useState(likes)

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    }
    blogService
      .update(id, updatedBlog)
      .then((response) => {
        setLike(response.likes)
      })
      .catch(({ response }) => {
        const { data } = response

        console.log(data.error)
      })
  }

  return (
    <div style={blogStyle} className='blog-item'>
      <div>
        <h1>{title}:</h1>
        <p>Author: {author} </p>
        <button className='is-hidden' onClick={() => setShow(!show)}>
          {show ? 'hide' : 'view'}
        </button>
      </div>
      {show && (
        <>
          <p>
            Likes: {like}{' '}
            {/* <button className='like-button' onClick={updateLikes}>
              like{' '}
            </button> */}
            <Button handler={updateLikes} />
          </p>
          <a href={url}>{url} </a>

          {blog.user && user.username === blog.user.username && (
            <button onClick={() => deleteHandler(blog)}>remove blog</button>
          )}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteHandler: PropTypes.func,
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

export default Blog
