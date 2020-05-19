import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@material-ui/core'

import blogService from '../../services/blogs'
import ButtonElement from './Button'

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
    <TableRow style={blogStyle} className='blog-item'>
      <Table>
        <TableBody>
          <TableCell>
            <h1>{title}:</h1>
            <p>Author: {author} </p>
            <Button className='view-button' onClick={() => setShow(!show)}>
              {show ? 'hide' : 'view'}
            </Button>

            {show && (
              <>
                <p>
                  Likes: {like}{' '}
                  <ButtonElement id='like-button' handler={updateLikes} />
                </p>
                <a href={url}>{url} </a>

                {blog.user && user.username === blog.user.username && (
                  <Button onClick={() => deleteHandler(blog)}>
                    remove blog
                  </Button>
                )}
              </>
            )}
          </TableCell>
        </TableBody>
      </Table>
    </TableRow>
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
