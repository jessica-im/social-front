import React, { useState } from 'react'
import axios from 'axios'

const NewAccountForm = (props) => {
  let [newUser, setNewUser] = useState({username: '', password: ''})

  const handleChange = (event) => {
       setNewUser({ ...newUser, [event.target.name]: event.target.value })
  }

  const createUser = (event) => {
    event.preventDefault()
    setNewUser({...newUser, [event.target.name]: event.target.value})
    handleCreateUser(newUser)
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
      <h4>Create Account</h4>

      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="Username" onChange={handleChange} value={newUser.username}/>
        <br/>
        <input type="password" name='password' placeholder="Password" onChange={handleChange} value={newUser.password}/>
        <br/>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}

export default NewAccountForm
