import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Add from './components/Add'
import Edit from './components/Edit'
import LoginForm from './components/LoginForm'
import AddComment from './components/addComment'
import NewAccountForm from './components/NewAccountForm'

const App = () => {
     let [questions, setQuestions] = useState([])
     let [signedIn,setSignedIn]=useState(false)
     let [user, setUser] = useState([])
     let [comments,setComments]=useState([])
     let [userObj, setUserObj] = useState( {username: '', password: ''})

     const getQuestions = () => {
          axios.get('https://social-sess-back.herokuapp.com/api/questions')
          .then(
               (response) => setQuestions(response.data),
               console.log(questions),
               (error) => console.error(error)
          )
          .catch((error) => console.error(error))
     }

     const handleCreate = (addQuestion) => {
          axios.post('https://social-sess-back.herokuapp.com/api/questions', addQuestion)
          .then((response) => {
               console.log(response)
               getQuestions()
          })
     }

     const handleDelete = (event) => {
          axios.delete('https://social-sess-back.herokuapp.com/api/questions/' + event.target.value)
          .then((response) => {
               getQuestions()
          })
     }

     const handleUpdate = (editQuestion) => {
          axios.put('https://social-sess-back.herokuapp.com/api/questions/' + editQuestion.id, editQuestion)
          .then((response) => {
               getQuestions()
          })
     }


     const getComment=()=>{
          axios.get('https://social-sess-back.herokuapp.com/api/comments').then((response)=>{
               console.log(response.data)
               setComments(response.data)
               console.log(comments)

          })
     }

     const deleteComment = (event) => {
          axios.delete('https://social-sess-back.herokuapp.com/api/comments/' + event.target.value)
          .then((response) => {
               getComment()
          })
     }

     const createComment = (addComment,question) => {
        console.log(addComment)
          axios.post('https://social-sess-back.herokuapp.com/api/comments', addComment)
          .then((response) => {
            getComment()
          })
     }

     const handleLogout = () => {
          setSignedIn(false)
          setUserObj({username: '', password: ''})
        }



     useEffect(() => {
          getQuestions()
          getComment()
     }, [])

     return (
          <>
               <div className="nav">
                    <div>sign up {signedIn ? null: <NewAccountForm />}</div>
                    <h1> social.sesh </h1>
                    <div>log in {signedIn ? null : <LoginForm userObj={userObj} setUserObj={setUserObj} setSignedIn={setSignedIn} user={user} setUser={setUser}/>}</div>
                    {signedIn ? <button onClick={handleLogout}>Log Out</button>: null}
               </div>

               {signedIn ? <Add handleCreate={handleCreate} /> : null}

               <div className="questions-container">
                    {questions.map((question) => {
                         return (
                              <div className="question" key={question.id}>
                                   <h4>{question.question}</h4>
                                   {signedIn ? <Edit handleUpdate={handleUpdate} question={question} />:null}
                                   {signedIn ? <button onClick={handleDelete} value={question.id}>X</button>:null}
                                   <details>
                                        <summary>comments</summary>
                                        <AddComment createComment={createComment} question={question} handleUpdate={handleUpdate} setQuestions={setQuestions}/>
                                        {comments.map((comment)=>{
                                             return (
                                                  <>
                                                  {question.id === comment.question[0] ?
                                                  <div key={comment.id}>
                                                  {comment.comment}
                                                  <button onClick={deleteComment} value={comment.id}>Delete Comment</button>
                                                  </div>: null }
                                                  </>
                                             )
                                        })}
                                   </details>
                              </div>
                         )
                    })}
               </div>
          </>
     )
}

export default App
