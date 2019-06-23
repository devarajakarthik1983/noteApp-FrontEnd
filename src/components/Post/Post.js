import React from 'react';
import classes from './Post.css';
import axios from 'axios';


const post = (props) => {
    return(
        <article className={classes.Post}>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
        <button>Complete</button>
        <button>Edit</button>
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