/* eslint-disable linebreak-style */
import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateLikes, removeBlog }) => {
  const confirmDelete = () => {
    if (window.confirm(`"${blog.title}" will be remove`)) {
      removeBlog(blog)
    }
  }
  const removeStyle = {
    backgroundColor : 'black',
    color : 'white',
    marginBottom : '10px'
  }

  return (
    <div className="blog">
      {blog.title}
      <Togglable buttonLabel="view">
        <div className="div">
          <p>Link: {blog.url} &nbsp; <br /></p>
          <p>Like: {blog.likes} <button className="likeButton" onClick={() => updateLikes(blog)}>like</button> <br /> </p>
          <p>Written By: {blog.author}</p>
          <button style={removeStyle} className="likebtn" onClick={() => confirmDelete()}>remove</button>
        </div>
      </Togglable>

    </div>
  )
}

export default Blog