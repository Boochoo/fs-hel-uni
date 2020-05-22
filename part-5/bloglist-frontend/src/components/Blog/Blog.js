import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button, Card, Typography, CardContent } from '@material-ui/core'

import blogService from '../../services/blogs'
import ButtonElement from '../shared/ButtonElement'

import { deleteBlog } from '../../redux/actions/blogActions'

const Blog = ({ blog, user, deleteBlog }) => {
  const { title, author, likes, url, id } = blog

  const [show, setShow] = useState(false)
  const [like, setLike] = useState(likes)

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: ++blog.likes,
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

  const onDelete = (blog) => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(message)) {
      deleteBlog(blog)
    }
  }

  return (
    <Card style={blogStyle} className='blog-item'>
      <CardContent>
        <Typography color='primary' gutterBottom>
          {title}:
        </Typography>
        <Typography>Author: {author} </Typography>
        <Button className='view-button' onClick={() => setShow(!show)}>
          {show ? 'hide' : 'view'}
        </Button>

        {show && (
          <>
            <div>
              <Typography>Likes: {like}</Typography>
              <ButtonElement
                id='like-button'
                text='like'
                handler={updateLikes}
              />
            </div>

            <a href={url}>{url} </a>

            {blog.user && user.username === blog.user.username && (
              <Button onClick={() => onDelete(blog)}>remove blog</Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func,
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const mapDispatchToProps = (dispatch) => ({
  deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
})

export default connect(null, mapDispatchToProps)(Blog)
