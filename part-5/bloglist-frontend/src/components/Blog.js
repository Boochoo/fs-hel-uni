import React from 'react'
const Blog = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}:</h1>
      <p>Author: {blog.author} </p>
      <p>Likes: {blog.likes} </p>
      <a href={blog.url}>{blog.url} </a>
    </div>
  )
}

export default Blog
