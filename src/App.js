import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Add from './components/Add'
import Edit from './components/Edit'

const App = () => {
     let [questions, setQuestions] = useState([])

     const getQuestions = () => {
          axios.get('https://social-sess-back.herokuapp.com/api/questions')
          .then(
               (response) => setQuestions(response.data),
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

     useEffect(() => {
          getQuestions()
     }, [])

     return (
          <>
               <h1> hello universe </h1>
               <Add handleCreate={handleCreate} />
               <div className="questions">
                    {questions.map((question) => {
                         return (
                              <div className="question" key={question.id}>
                                   <h4>{question.question}</h4>
                                   <Edit handleUpdate={handleUpdate} question={question} />
                                   <button onClick={handleDelete} value={question.id}>X</button>
                              </div>
                         )
                    })}
               </div>
          </>
     )
}

export default App
