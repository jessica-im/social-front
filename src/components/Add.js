import React, {useState} from 'react'

const Add =(props)=>{
    let emptyQuestion={question:''}
    const [question,setQuestion]=useState(emptyQuestion)

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.handleCreate(question)
    }


    const handleChange =(e)=>{
        setQuestion({...question,[e.target.name]:e.target.value})
    }


    return(
        <>
          <div className="add-question-container">
               <form className="add-question" onSubmit={handleSubmit}>
                    <label htmlFor="question">add question</label>
                    <input className="qField" type="text" name='question' placeholder="let's talk..." onChange={handleChange}/>
                    <input className="addQSubmit" type='submit' />
               </form>
          </div>
        </>
    )
}
export default Add
