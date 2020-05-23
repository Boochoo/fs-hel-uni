import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, Typography, CardContent } from '@material-ui/core'

const BlogLink = ({ blog }) => {
  const { title, author, id } = blog
  return (
    <Card style={blogStyle} className='blog-item'>
      <CardContent>
        <Typography>
          <Link to={`/blogs/${id}`}>
            {title}: by {author}{' '}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

BlogLink.propTypes = {
  blog: PropTypes.object.isRequired,
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

export default BlogLink
