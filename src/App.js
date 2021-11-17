import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
     let [questions, setQuestions] = useState([])

     const getQuestions = () => {
          axios.get('http://localhost:8000/api/questions')
          .then(
               (response) => setQuestions(response.data),
               (err) => console.error(error)
          )
          .catch((error) => console.error(error))
     }

     const handleUpdate = (editQuestion) => {
          axios.put('http://localhost:8000/api/questions' + editQuestion.id, editQuestion)
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
               <div className="questions">
                    {questions.map((question) => {
                         return (
                              <div className="question" key={question.id}>
                                   <h4>{question.question}</h4>
                                   <Edit handleUpdate={handleUpdate} question={question} />
                              </div>
                         )
                    })}
               </div>
          </>
     )
}

export default App
