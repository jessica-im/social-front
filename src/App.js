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
               // console.log(questions),
               (error) => console.error(error)
          )
          .catch((error) => console.error(error))
     }

     const handleCreate = (addQuestion) => {
          axios.post('https://social-sess-back.herokuapp.com/api/questions', addQuestion)
          .then((response) => {
               // console.log(response)
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
               // console.log(response.data)
               setComments(response.data)
               // console.log(comments)

          })
     }

     const deleteComment = (event) => {
          axios.delete('https://social-sess-back.herokuapp.com/api/comments/' + event.target.value)
          .then((response) => {
               getComment()
          })
     }

     const createComment = (addComment,question) => {
        // console.log(addComment)
          axios.post('https://social-sess-back.herokuapp.com/api/comments', addComment)
          .then((response) => {
            getComment()
          })
     }

     const handleLogout = () => {
          setSignedIn(false)
          setUserObj({username: '', password: ''})
        }

     const randomId = () => {
          // return Math.floor(Math.random())
          console.log(Math.floor(Math.random()))
     }

     randomId()

     useEffect(() => {
          getQuestions()
          getComment()
     }, [])

     return (
          <>
               <div className="signUp-logIn">
                    <div>sign up {signedIn ? null: <NewAccountForm />}</div>
                    <div>log in {signedIn ? null : <LoginForm userObj={userObj} setUserObj={setUserObj} setSignedIn={setSignedIn} user={user} setUser={setUser}/>}</div>
                    {signedIn ? <div onClick={handleLogout}>logout</div>: null}
               </div>
               <div className="title">
                    <h1> social.sesh </h1>
               </div>

               {signedIn ? <Add handleCreate={handleCreate} /> : null}

               <div className="questions-container">
                    {questions.map((question) => {
                         if (question.id === 3) {
                              return (
                                   <div className="question" key={question.id}>
                                        <div className="question-div">
                                             <h4>{question.question}</h4>
                                        </div>
                                        <details className="comments-detail">
                                             <summary className="comments-summary">comments</summary>
                                             <AddComment createComment={createComment} question={question} handleUpdate={handleUpdate} setQuestions={setQuestions}/>
                                             <div className="comments-container">
                                                  {comments.map((comment)=>{
                                                       return (
                                                            <>
                                                            <div className="comments-container">
                                                                 {question.id === comment.question[0] ?
                                                                 <div className="comment-container" key={comment.id}>
                                                                      <div className="comment">{comment.comment}</div>
                                                                      <button className="deleteComment" onClick={deleteComment} value={comment.id}>X</button>
                                                                 </div>: null }
                                                            </div>
                                                            </>
                                                       )
                                                  })}
                                             </div>
                                        </details>
                                        <div className="editDelete">
                                             {signedIn ? <Edit handleUpdate={handleUpdate} question={question} />:null}
                                             {signedIn ? <button className="delete" onClick={handleDelete} value={question.id}>X</button>:null}
                                        </div>
                                   </div>
                              )
                         }

                    })}
               </div>
          </>
     )
}

export default App
