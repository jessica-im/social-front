import React, { useState } from 'react'
import axios from 'axios'

const LoginForm = (props) => {
  const [user, setUser] = useState({ ...props.user})
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  let [userObj, setUserObj] = useState( {username: '', password: ''})

  const handleChange = (event) => {
       setUserObj({ ...userObj, [event.target.name]: event.target.value })
  }

  // const getUsers = () => {
  //   axios
  //     .get('https://social-sess-back.herokuapp.com/api/useraccount')
  //     .then(
  //       (response) => setUser(response.data),
  //       (error) => console.log(error)
  //     )
  //     .catch((error) => console.log(error))
  // }

  const handleLogin = (userObj) => {
    axios
      .put(
        'https://social-sess-back.herokuapp.com/api/useraccount/login', userObj
      ).then((response) => {
        if(response.data.username) {
          setToggleError(false)
          setErrorMessage('')
          props.setSignedIn(true)
          handleToggleLogout()
          props.setUser(response.data.username)
        } else {
          setErrorMessage(response.data)
          setToggleError(true)
        }
      })
  }

  const handleLogout = () => {
    props.setSignedIn(false)
    setUserObj({username: '', password: ''})
    handleToggleLogout()
  }

  const handleToggleLogout = () => {
    if (toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(userObj)
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <br/>
      <br/>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name='username' placeholder="Username" onChange={handleChange} value={userObj.username}/>
        <br/>
        <input type="password" name='password' placeholder="Password" onChange={handleChange} value={userObj.password}/>
        <br/>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginForm
