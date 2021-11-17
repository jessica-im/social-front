import React, {useState} from 'react'

const Add =(props)=>{
    let emptyQuestion={question:''}
    const [question,setQuestion]=useState(emptyQuestion)

    const handleSubmit=(e)=>{
        preventDefault()
        props.handleCreate(question)
    }


    const handleChange =(e)=>{
        setQuestion({...question,[e.target.name]:e.target.value})
    }

    
    return(
        <>
         <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <input type="text" name='question' onChange={handleChange}/>
            <input type='submit'/>
         </form>
        </>
    )
}
export default Add