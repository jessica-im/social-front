import React, {useState} from 'react'

const Add =(props)=>{
    let emptyQuestion={question:''}
    const [question,setQuestion]=useState(emptyQuestion)

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.handleCreate(question)
        setQuestion({question:''})
        props.setHideCreate(true)
    }


    const handleChange =(e)=>{
        setQuestion({...question,[e.target.name]:e.target.value})
    }


    return(
        <>
          <div className="add-question-container">
               <form className="add-question" onSubmit={handleSubmit}>
                    <label htmlFor="question"></label>
                    <input className="qField" type="text" name='question' value={question.question} placeholder="let's talk..." onChange={handleChange}/>
                    <input type="submit" value="submit" />
               </form>
          </div>
        </>
    )
}
export default Add
