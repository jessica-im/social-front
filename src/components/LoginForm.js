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
      <form className="loginForm" onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="username" onChange={handleChange} value={props.userObj.username}/>
        <input type="password" name='password' placeholder="password" onChange={handleChange} value={props.userObj.password}/>
        <input className="button" type="submit" value="login" />
      </form>
    </div>
  )
}

export default LoginForm
