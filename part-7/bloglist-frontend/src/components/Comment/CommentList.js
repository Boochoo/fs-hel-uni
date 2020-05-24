import React, { useState } from 'react'
import { generate as generateId } from 'shortid'
import { connect } from 'react-redux'

import { Button, Typography, TextField, Grid, Paper } from '@material-ui/core'

import { addComment } from '../../redux/actions/blogActions'

const CommentList = ({ id, comments, addComment }) => {
  const [newComment, setNewComment] = useState('')

  const onAddComment = () => {
    if (newComment) {
      addComment(id, { comment: newComment })
      setNewComment('')
    }
  }

  return (
    <Grid>
      <h2>Comments</h2>
      <Grid container>
        <TextField
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          style={{ marginRight: 15 }}
        ></TextField>
        <Button onClick={onAddComment} variant='contained'>
          Add comment
        </Button>
      </Grid>
      {comments
        .filter((c) => c)
        .map((c) => (
          <div key={generateId()}>
            <Paper
              style={{
                padding: '10px',
                marginTop: 20,
                color: '#eff0f1',
                background: '#0c0d0e',
              }}
            >
              <Grid item xs zeroMinWidth>
                <Typography>{c}</Typography>
              </Grid>
            </Paper>
          </div>
        ))
        .reverse()}
    </Grid>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (id, comment) => dispatch(addComment(id, comment)),
})
export default connect(null, mapDispatchToProps)(CommentList)
