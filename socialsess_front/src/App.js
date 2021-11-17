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

     return (
          <>
               <h1> hello universe </h1>
               <div className="questions">
                    {questions.map((question) => {
                         return (
                              <div className="question" key={question.id}>
                                   <h4>{question.question}</h4>
                              </div>
                         )
                    })}
               </div>
          </>
     )
}

export default App
