import React, { useEffect } from 'react'
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getUsers } from '../redux/actions/loginActions'

const Users = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <Typography variant='h5' component='h2'>
        Users
      </Typography>
      <TableContainer>
        <Table size='small' aria-label='simple table' style={{ maxWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='right'>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell component='th' scope='row'>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell align='right'>{user.blogs.length}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  users: state.users,
})

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
