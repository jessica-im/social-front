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
                    <summary className="edit-detail">edit question</summary>
                    <form className="edit" onSubmit={handleSubmit}>
                         <label htmlFor="question"></label>
                         <input className="edit-field" type="text" name="question" onChange={handleChange} value={question.question} />
                         <input type="submit" value="edit"/>
                    </form>
               </details>
          </>
     )

}

export default Edit
