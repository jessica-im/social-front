import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = (props) => {


  const handleChange = (event) => {
       props.setUserObj({ ...props.userObj, [event.target.name]: event.target.value })
  }


  const handleLogin = (userObj) => {
    axios
      .put(
        'https://social-sess-back.herokuapp.com/api/useraccount/login', props.userObj
      ).then((response) => {
        if(response.data.username) {
          props.setSignedIn(true)
          props.setUser(response.data.username)
        } else {
        }
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(props.userObj)
  }

  return (
    <div>
      <br/>
      <br/>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="Username" onChange={handleChange} value={props.userObj.username}/>
        <br/>
        <input type="password" name='password' placeholder="Password" onChange={handleChange} value={props.userObj.password}/>
        <br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginForm
