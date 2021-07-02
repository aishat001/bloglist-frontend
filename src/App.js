import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [username, setUsername] = useState('Aeeshah');
  const [password, setPassword] = useState('mypassword');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) 

    const createBlog = async (e) => {
      e.preventDefault()
      try {
      const blogObject = {
          title: newTitle,
          author: newAuthor,
          url: newUrl
      }
     const savedBlog = await blogService.create(blogObject)

          setBlogs(blogs.concat(savedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
      setInfo('A new blog created')
    } catch (exception) {
        setErrorMessage("unsuccessful")
        console.log('not successful');
      }
    } 

    const handleLogin = async (e) => {
      e.preventDefault()
      try {
        const user = await loginService.login({
          username, password
        })
        console.log('logging in with', username, password, user)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        setUser(user)
        setUsername('')
        setPassword('')

      } catch (exception) {
        setErrorMessage('wrong credentials')
      }
    }
    const loginForm = () => ( 
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input type="text" name="username" value={username}
            onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input type="password" name="password" value= {password}
            onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
      ) 
    const blogForm = () => (
      <form onSubmit={createBlog}>
          <h2>Create new Blog </h2>
          <div>
            Title:
            <input type="text" name="title" value={newTitle} onChange={({target}) => setNewTitle(target.value)}/>
          </div><br></br>
          <div>
            Author:
            <input type="text" name="author" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/>
          </div><br></br>
          <div>
            Url:
            <input type="text" name="url" value={newUrl} onChange={({target}) => setNewUrl(target.value)}/>
          </div><br></br>
          <button type="submit">save</button>
      </form>
)

const handleLogout = (e) => {
  setUser(null)
  localStorage.clear()
}
  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} setErrorMessage={setErrorMessage} info={info} setInfo={setInfo}/>

      {
        user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div> :
        <div>
          <p>{user.name} loggen in <button onClick={handleLogout}>logout</button></p>
          {blogs.map(blog => {
            if(blog.user)  {
              return <Blog key={blog.id} blog={blog} /> 
            } else {
              return null
            }
          }
          )}
          {blogForm()} :
        </div>
      }



    </div>
  )
}

export default App