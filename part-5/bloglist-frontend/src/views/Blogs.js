import React from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Card,
  Typography,
  CardContent,
  Grid,
  Box,
} from '@material-ui/core'

import { deleteBlog, updateBlog } from '../redux/actions/blogActions'
import ButtonElement from '../components/shared/ButtonElement'
import CommentList from '../components/Comment'

const Blogs = ({ match, blogs, login, deleteBlog, updateBlog }) => {
  const blog = blogs.find((blog) => blog.id === match.params.id)

  if (!blog) return null

  const { title, author, url, likes, comment, id } = blog

  const updateLikes = async () => {
    const updatedBlog = {
      ...blog,
      likes: ++blog.likes,
    }

    updateBlog(id, updatedBlog)
  }

  const onDelete = (blog) => {
    const message = `Remove blog ${blog.title} by ${blog.author}?`

    if (window.confirm(message)) {
      deleteBlog(blog)
    }
  }

  return (
    blog && (
      <>
        <Card>
          <CardContent>
            <Typography variant='h4' component='h2' gutterBottom>
              {title} by {author}
            </Typography>
            <Box mb={2}>
              <Typography variant='body2' component='p'>
                <a href={url}>Author: {author} </a>
              </Typography>
            </Box>
            <Box mb={2}>
              <Grid container alignItems='center'>
                <Typography style={{ marginRight: 10 }}>
                  {likes} likes
                </Typography>
                <ButtonElement
                  id='like-button'
                  text='like'
                  handler={updateLikes}
                />
              </Grid>
            </Box>
            {blog.user && login.userData.username === blog.user.username && (
              <Button
                size='small'
                variant='outlined'
                onClick={() => onDelete(blog)}
              >
                remove blog
              </Button>
            )}
          </CardContent>
        </Card>

        <CommentList id={match.params.id} comments={comment} />
      </>
    )
  )
}

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => ({
  deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
  updateBlog: (blogId, updatedBlog) =>
    dispatch(updateBlog(blogId, updatedBlog)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)
