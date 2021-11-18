import React, { usestate } from 'react'
import axios from 'axios'

const NewAccountForm = (props) => {
  let [newUser, setNewUser] = useState({username: '', password: ''})

  const createUser = (event) => {
    event.preventDefault()
    setNewUser({...newUser, [event.target.name]: event.target.value})
    handleCreateUser(newUser)
  }

  handleCreateUser = (newUser) => {
    axios
      .post('https://social-sess-back.herokuapp.com/api/useraccount')
  }

  return (
    <div>
      <h4>Login</h4>

      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="Username" onChange={handleChange}/>
        <br/>
        <input type="password" name='password' placeholder="Password" onChange={handleChange}/>
        <br/>
        <input type="submit" value="Login" class="button"/>
      </form>
    </div>
  )
}
