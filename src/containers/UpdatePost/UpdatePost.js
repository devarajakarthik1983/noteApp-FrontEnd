import React, { Component } from 'react';
import classes from './UpdatePost.css';
import axios from 'axios';


//import axios from 'axios';

class UpdatePost extends Component {

    state ={
        title:'',
        text:'',
        completed:false,
        error:false
    }

  componentDidMount() {
   
    const id = this.props.match.params.id;
    axios.get('http://localhost:3001/notes/' + id)
        .then(response=>{
            this.setState({title:response.data.title});
                this.setState({text:response.data.title});
        }).catch(e=>{
            console.log(e);
        })
    
  }

    postDataHandler =(event)=>{
        event.preventDefault();
        const id = this.props.match.params.id;
        const data = {
            title: this.state.title,
            text: this.state.text,
            
        };
        axios.patch('http://localhost:3001/notes/' + id ,data)
            .then(response => {
                //console.log(response);
                this.setState({completed:true});
                localStorage.removeItem('id');
                this.props.history.push('/');
            })
            .catch(e=>{
                //console.log(e);
                this.setState({error:true});
            })

    }
    

    cancelDataHandler =()=>{
        this.props.history.push('/');
    }
   
    render () {
        return (
            <div className={classes.UpdatePost}>
                <h4>Update your Note</h4>
                <form>
                        <label><b>Enter Title:</b><input type="text" placeholder="Update your Title..." onChange={(event)=>this.setState({title: event.target.value})} value={this.state.title}/></label>
                        <br />
                        <label><b>Enter Text:</b> <br/><textarea type="text" placeholder="Update your Text..."  rows="10" cols="50" onChange={(event)=>this.setState({text: event.target.value})} value={this.state.text}/></label>
                        <br />
                        <br />
                        <button onClick={(event)=>this.postDataHandler(event)}>Update Note</button>
                        <button onClick={this.cancelDataHandler}>Cancel</button>
                        {this.state.completed ? <p>Note updated Successfully</p> : null}
                        {this.state.error ? <p>Sorry unable to update notes.Try again later</p> : null}
            </form>
               
            </div>
        );
    }
}



export default UpdatePost;