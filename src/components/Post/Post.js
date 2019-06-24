import React from 'react';
import classes from './Post.css';
import axios from 'axios';




const post = (props) => {
    return(
        <article className={classes.Post}>
        <h3  style={{ textDecorationLine: props.striked ? 'line-through': null }}>{props.title}</h3>
        <p style={{ textDecorationLine: props.striked ? 'line-through': null }}>{props.text}</p>
        <button onClick={props.complete}>{props.striked ? 'Undo Complete' : 'Complete'}</button>
       <button onClick={props.edit} disabled={props.striked} >Edit</button>
        <button  
    onClick={()=>{
        axios.delete('http://localhost:3001/notes/' + props.id)
        .then(response=>{
            console.log(response.data);
            props.fetchNotes();
        }).catch(e=>{
            console.log(e);
        })
    }}
        
        >Delete</button>
    </article>
    );
}


export default post;