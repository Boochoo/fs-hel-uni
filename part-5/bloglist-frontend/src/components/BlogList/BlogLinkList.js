import React from 'react'

import BlogLink from '../Blog/BlogLink'
import BlogForm from '../BlogForm/'

const BlogLinkList = ({ blogs }) => {
  return (
    <div className='blogs-wrapper'>
      <BlogForm />
      {blogs.map((blog) => (
        <BlogLink key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogLinkList
