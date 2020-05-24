import React from 'react'
import { connect } from 'react-redux'

const User = ({ match, users }) => {
  const user = users && users.find((blog) => blog.id === match.params.id)

  if (!user) return null

  return (
    user.blogs && (
      <div>
        <div>
          <h2>{user.username}</h2>
          <h3>{`${
            user.blogs.length > 0 ? 'Added blogs' : 'No blogs added'
          }`}</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps, null)(User)
