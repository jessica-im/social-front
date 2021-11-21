import React, { useState } from 'react'
import axios from 'axios'

const NewAccountForm = (props) => {
  let [newUser, setNewUser] = useState({username: '', password: ''})

  const handleChange = (event) => {
       setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const handleCreateUser = (addUser) => {
    axios
      .post('https://social-sess-back.herokuapp.com/api/useraccount', addUser)
      .then((response) => {
        console.log(response)
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreateUser(newUser)
  }

  return (
    <div>
      <form className="createAccountForm" id="sign-up" onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="username" onChange={handleChange} value={newUser.username}/>
        <input type="password" name='password' placeholder="password" onChange={handleChange} value={newUser.password}/>
        <input className="button" type="submit" value="create account" />
      </form>
    </div>
  )
}

export default NewAccountForm
