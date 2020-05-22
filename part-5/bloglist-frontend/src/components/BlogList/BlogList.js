import React from 'react'

import Blog from '../Blog/'

const BlogList = ({ blogs, user, handler }) => {
  return (
    <div className='blogs-wrapper'>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} deleteHandler={handler} />
      ))}
    </div>
  )
}

export default BlogList
