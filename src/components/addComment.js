import React,{useState} from 'react'


const AddComment = (props)=>{
    let emptyComment={comment:'', question: []}
    const [comment,setComment]=useState(emptyComment)

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.createComment(comment)
        setComment({comment:''})
    }

    const handleChange =(e)=>{
        setComment({comment:e.target.value, question: [props.question.id]})
    }


    return(
        <>
              <form className="addComment" onSubmit={handleSubmit}>
                 <input type="text" name='comment' placeholder="add a comment" value={comment.comment} onChange={handleChange}/>
                 <input type='submit' value="submit"/>
              </form>
        </>
    )
}
export default AddComment
