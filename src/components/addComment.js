import React,{useState} from 'react'


const AddComment = (props)=>{
    let emptyComment={comment:''}
    const [comment,setComment]=useState(emptyComment)
    const [question, setQuestion] = useState({ ...props.question })

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.createComment(comment)
        props.handleUpdate()
    }

    const handleChange =(e)=>{
        setComment({...comment,[e.target.name]:e.target.value})
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