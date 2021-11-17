import React, { useState } from 'react'

const Edit = (props) => {
     const [question, setQuestion] = useState({ ...props.question })

     const handleChange = (event) => {
          setQuestion({ ...question, [event.target.name]: event.target.value })
     }

     const handleSubmit = (event) => {
          event.preventDefault()
          props.handleUpdate(question)
     }

     return (
          <>
               <details>
                    <summary>Edit Question</summary>
                    <form onSubmit={handleSubmit}>
                         <label htmlFor="question">Question: </label>
                         <input type="text" name="question" onChange={handleChange} value={question.question} />
                         <br />
                         <br />
                         <input type="submit" />
                    </form>
               </details>
          </>
     )

}

export default Edit
