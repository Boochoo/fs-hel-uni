import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
  Button,
  Card,
  Typography,
  CardContent,
  Container,
  Grid,
} from '@material-ui/core'

import blogService from '../services/blogs'
import { addComment, deleteBlog } from '../redux/actions/blogActions'
import ButtonElement from '../components/shared/ButtonElement'
import CommentList from '../components/Comment/'

const BlogPage = ({ match, blogs, login, deleteBlog }) => {
  const blog = blogs.find((blog) => blog.id === match.params.id)

  const [like, setLike] = useState('')

  if (!blog) return null

  const { title, author, url, likes, comment, id } = blog

  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: ++blog.likes,
    }
    blogService
      .update(id, updatedBlog)
      .then(({ likes }) => {
        setLike(likes)
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
    blog && (
      <Container>
        <Card>
          <CardContent>
            <Typography variant='h5' component='h2' gutterBottom>
              {title} by {author}
            </Typography>
            <Typography variant='body2' component='p'>
              <a href={url}>Author: {author} </a>
            </Typography>
            <Grid container alignItems='center'>
              <Typography style={{ marginRight: 10 }}>
                {like ? like : likes} likes
              </Typography>
              <ButtonElement
                id='like-button'
                text='like'
                handler={updateLikes}
              />
            </Grid>
            {blog.user && login.userData.username === blog.user.username && (
              <Button size='small' onClick={() => onDelete(blog)}>
                remove blog
              </Button>
            )}
          </CardContent>
        </Card>

        <CommentList id={match.params.id} comments={comment} />
      </Container>
    )
  )
}

const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => ({
  addComment: (id, comment) => dispatch(addComment(id, comment)),
  deleteBlog: (blogId) => dispatch(deleteBlog(blogId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)
