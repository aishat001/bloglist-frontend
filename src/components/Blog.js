import React from 'react'
import Togglable from './Togglable';

const Blog = ({blog, updateLikes}) => {
  return ( 
    <div className="blog">
    {blog.title}
    <Togglable buttonLabel="view">
        <div>
           <p>Link: {blog.url} &nbsp; <br /></p> 
           <p>Like: {blog.likes} <button onClick={() => updateLikes(blog)}>like</button> <br /> </p>
            <p>Written By: {blog.author}</p>
        </div>
    </Togglable>

  </div>  
   );
}
 
export default Blog;