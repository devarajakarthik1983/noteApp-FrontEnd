import React, {Component} from 'react';
import classes from './Post.css';
import axios from 'axios';


class Post extends Component {

    state={
        complete:false,
        error:false
    }

    render(){
        return(
            <article className={classes.Post}><span style={{float:'right'}} onClick={()=>{
                axios.delete('http://localhost:3001/notes/' + this.props.id)
                .then(response=>{
                    console.log(response.data);
                    this.props.fetchNotes();
                }).catch(e=>{
                    console.log(e);
                })
            }}>x</span>
            <h3 style={{ textDecorationLine: this.state.complete ? 'line-through': null }}>{this.props.title}</h3>
            <p style={{ textDecorationLine: this.state.complete ? 'line-through': null }}>{this.props.text}</p>
            <button onClick={()=>{
                if(!this.state.complete){
                    axios.patch('http://localhost:3001/notes/' + this.props.id , {complete:true})
                    .then(response => {
                        console.log(response.data);
                        this.setState({complete:true})
                    })
                    .catch(e=>{
                        this.setState({error:true})
                    })
                } else {
                    axios.patch('http://localhost:3001/notes/' + this.props.id , {complete:false})
                    .then(response => {
                        console.log(response.data);
                        this.setState({complete:false})
                    })
                    .catch(e=>{
                        this.setState({error:true})
                    })
                }
                
                    
            }}>{this.state.complete ? ' Undo Complete' :'Complete'}</button>
           <button onClick={this.props.edit} disabled={this.state.complete}>Edit</button>
            <button  
        onClick={()=>{
            axios.delete('http://localhost:3001/notes/' + this.props.id)
            .then(response=>{
                console.log(response.data);
                this.props.fetchNotes();
            }).catch(e=>{
                console.log(e);
            })
        }}>Delete</button>
        {this.state.error ? <p>Unable to complete the note try again later</p> : null}
        </article>
        );
    }
}





export default Post;