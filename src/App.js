/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [info, setInfo] = useState(null)
  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()
      const addBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addBlog))

      setInfo('A new blog created')
    } catch (exception) {
      setErrorMessage('unsuccessful')
      console.log('not successful')
    }
  }
  const likeBlog = async blog => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const updatedBlog = await blogService.update(blog.id, newBlog)
      setBlogs(blogs.map(item => item.id === blog.id ? updatedBlog : item))
    } catch (exception) {
      console.log('error')
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
    <Togglable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }
  const removeBlog = async ({ id, title }) => {

    try {
      const allbBlogs = [...blogs]
      await blogService.remove(id)
      setBlogs(allbBlogs.filter((obj) => obj.id !== id))
      setInfo(`${title} has been removed`, 'success')
    } catch (error) {
      console.log({ error })
      setErrorMessage(error.response.data.error, 'error')
    }
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
            {blogs.sort((blog1, blog2) => blog2.likes - blog1.likes).map(blog => {
              if(blog.user)  {
                return <Blog key={blog.id} blog={blog} updateLikes={likeBlog} removeBlog={removeBlog}/>


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