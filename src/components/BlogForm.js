/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <h2>Create new Blog </h2>
      <div>
          Title:
        <input id="title" type="text" name="title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
      </div><br></br>
      <div>
          Author:
        <input id="author" type="text" name="author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
      </div><br></br>
      <div>
          Url:
        <input id="url" type="text" name="url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
      </div><br></br>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
