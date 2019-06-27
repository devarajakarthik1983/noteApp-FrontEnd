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
                this.props.history.push('/myposts');
            })
            .catch(e=>{
                //console.log(e);
                this.setState({error:true});
            })

    }
    

    cancelDataHandler =()=>{
        this.props.history.push('/myposts');
    }
   
    render () {
        return (
            <div className={classes.UpdatePost}>
                 <h4><span class="label label-default">UPDATE YOUR NOTE</span></h4><br/>
                <form>
                        <label><b>Enter Title:</b><input type="text" placeholder="Update your Title..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title}/></label>
                        <br />
                        <label><b>Enter Text:</b><br/><br/>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" cols="80" type="text" placeholder="Update your Text..."  
                        onChange={(event)=>this.setState({text: event.target.value})}
                        value={this.state.text}></textarea>
                        </label>
                        <br />
                        <br />
                        <button type="button" class="btn btn-success"onClick={(event)=>this.postDataHandler(event)} >UPDATE NOTE</button>
                        <button type="button" class="btn btn-danger"onClick={this.cancelDataHandler} >CANCEL</button>
                        {this.state.completed ? <p style={{color:'green'}}>Note updated Successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to update notes.Try again later</p> : null}
            </form>
               
            </div>
        );
    }
}



export default UpdatePost;