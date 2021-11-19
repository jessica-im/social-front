import React,{useState} from 'react'


const AddComment = (props)=>{
    let emptyComment={comment:'', question: []}
    const [comment,setComment]=useState(emptyComment)
    const [question, setQuestion] = useState({ ...props.question })

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.createComment(comment)
    }

    const handleChange =(e)=>{
        setComment({comment:e.target.value, question: [props.question.id]})
        // setQuestion({...question,comment:})
    }


    return(
        <>
         <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Comment:</label>
            <input type="text" name='comment' onChange={handleChange}/>
            <input type='submit'/>
         </form>
        </>
    )
}
export default AddComment
