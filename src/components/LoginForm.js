/* eslint-disable linebreak-style */
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input id="username" type="text" name="username" value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password:
          <input id="password" type="password" name="password" value= {password}
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="loginbtn" type="submit">login</button>
      </form>

    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  setUsername : PropTypes.func.isRequired,
  setPassword : PropTypes.func.isRequired
}

export default LoginForm