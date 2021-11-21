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
     let [hideSignIn,setHideSignIn] = useState(true)
     let [hideLogIn,setHideLogIn] = useState(true)
     let [hideCreate,setHideCreate]=useState(true)
     let [randomNumber,setRandomNumber]=useState(Math.floor(Math.random()*questions.length))


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
          setHideLogIn(true)
          setHideSignIn(true)
          setHideCreate(true)
        }

     const randomId = () => {
          console.log(Math.floor(Math.random()*questions.length))
          setRandomNumber(Math.floor(Math.random()*questions.length))
     }
     const changeHideSignIn=()=>{
          if (hideSignIn ==true){
               setHideSignIn(false)
          }else{
               setHideSignIn(true)
          }
     }

     const changeHideLogIn=()=>{
          if (hideLogIn ==true){
               setHideLogIn(false)
          }else{
               setHideLogIn(true)
          }
     }

     const changeHideCreate =()=>{
          if (hideCreate ==true){
               setHideCreate(false)
          }else{
               setHideCreate(true)
          }
     }

     useEffect(() => {
          getQuestions()
          getComment()
     }, [])

     return (
          <>

               <div className="title">
                    <h1> social.sesh </h1>
               </div>
               <div className="signUp-logIn">
                    {signedIn ?
                    <div>
                         <div className="button" onClick={changeHideCreate}>add question</div>
                         {hideCreate ? null: <Add handleCreate={handleCreate} setHideCreate={setHideCreate}/> }
                    </div>
                    :
                    <>
                    <div>
                         <div className="button" onClick={changeHideSignIn}>sign up</div> {(signedIn || hideSignIn) ? null: <NewAccountForm />}
                    </div>
                    <div>
                         <div className="loginButton button" onClick={changeHideLogIn}>log in</div> {signedIn ||hideLogIn ? null : <LoginForm userObj={userObj} setUserObj={setUserObj} setSignedIn={setSignedIn} user={user} setUser={setUser}/>}
                    </div>
                    </> }

                    {signedIn ? <div className="button" onClick={handleLogout}>logout</div>: null}
               </div>
               <div className="randomQ button" onClick={randomId}>refresh your sesh</div>
               <div className="questions-container">
                    {questions.map((question) => {
                         return(
                         <>
                         {question.id == questions[randomNumber].id ?
                                   <div className="question" key={question.id} >
                                        <div className="question-div" >
                                             <p>{question.question}</p>
                                        </div>
                                        <details className="comments-detail">
                                             <summary className="comments-summary button">comments</summary>
                                             {signedIn ? <AddComment createComment={createComment} question={question} handleUpdate={handleUpdate} setQuestions={setQuestions}/> : null}
                                             <div className="comments-container">
                                                  {comments.map((comment)=>{
                                                       return (
                                                            <>
                                                            <div className="comments-container">
                                                                 {question.id === comment.question[0] ?
                                                                 <div className="comment-container" key={comment.id}>
                                                                      <div className="comment">{comment.comment}</div>
                                                                      {signedIn ? <button className="deleteComment button" onClick={deleteComment} value={comment.id}>X</button> : null}
                                                                 </div>: null }
                                                            </div>
                                                            </>
                                                       )
                                                  })}
                                             </div>
                                        </details>
                                        <div className="editDelete">
                                             {signedIn ? <Edit handleUpdate={handleUpdate} question={question} />:null}
                                             {signedIn ? <button className="delete button" onClick={handleDelete} value={question.id}>X</button>:null}
                                        </div>
                                   </div>
                              : null
                         }
                         </>
                    )})}
               </div>
          </>
     )
}

export default App
