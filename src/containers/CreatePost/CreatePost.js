import React, { Component } from 'react';
import classes from './CreatePost.css';
import axios from 'axios';


//import axios from 'axios';

class CreatePost extends Component {

    state ={
        title:'',
        text:'',
        completed:false,
        error:false
    }

    postDataHandler =(event)=>{
        event.preventDefault();
        const data = {
            title: this.state.title,
            text: this.state.text,
            
        };
        axios.post('http://localhost:3001/notes', data)
            .then(response => {
                console.log(response);
                this.setState({completed:true});
                this.setState({title:'' , text:''});
                this.props.history.push('/');
            })
            .catch(e=>{
                this.setState({error:true});
            })

    }
    
   
    render () {
        return (
            <div className={classes.CreatePost}>
                <h4>Enter your Note</h4>
                <form>
                        <label><b>Enter Title:</b><input type="text" placeholder="Enter your Title..." onChange={(event)=>this.setState({title: event.target.value})} value={this.state.title}/></label>
                        <br />
                        <label><b>Enter Text:</b> <br/><textarea type="text" placeholder="Enter your Text..."  rows="10" cols="50" onChange={(event)=>this.setState({text: event.target.value})} value={this.state.text}/></label>
                        <br />
                        <br />
                        <button onClick={(event)=>this.postDataHandler(event)}>Submit Note</button>
                        {this.state.completed ? <p>Note added Successfully</p> : null}
                        {this.state.error ? <p>Sorry unable to add notes</p> : null}
            </form>
               
            </div>
        );
    }
}



export default CreatePost;