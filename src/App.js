import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

    const createBlog = async (blogObject) => {
      try {

     const addBlog = await blogService.create(blogObject)

          setBlogs(blogs.concat(addBlog))

      setInfo('A new blog created')
    } catch (exception) {
        setErrorMessage("unsuccessful")
        console.log('not successful');
      }
    } 
    const likeBlog = async blog => {
      try {
        const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 });
        console.log(setBlogs(blogs.map(item => item.id === blog.id ? updatedBlog : item)))
      } catch (exception) {
          console.log("error");
      }
  };
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
      <Togglable buttonLabel="log in">
        <LoginForm
        handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Togglable>

      ) 
    const blogForm = () => (
      <Togglable buttonLabel="create blog">
        <BlogForm 
          createBlog={createBlog}
        />
      </Togglable>
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
              return <Blog key={blog.id} blog={blog} updateLikes={likeBlog} />
              
            
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