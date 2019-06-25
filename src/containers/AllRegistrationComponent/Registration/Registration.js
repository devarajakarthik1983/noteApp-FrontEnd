import React, { Component } from 'react';
import classes from './Registration.css';
import axios from 'axios';




class Registration extends Component {

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

    cancelDataHandler =()=>{
        this.props.history.push('/');
    }
    
   
    render () {
        return (
            <div className={classes.Registration}>
                <h4><span class="label label-default">LOGIN</span></h4><br/>
                <form>
                        <label><b>Enter Username:</b><input type="text" placeholder="Enter your Username..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title} style={{width:'200px'}} /></label>
                        <br />
                        <label style={{margin:'0px 0px 0px 15px'}}><b>Enter Email-ID:</b><input type="email" placeholder="Enter your Email..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title}  style={{width:'210px'}}/></label><br />
                        <label style={{margin:'0px 0px 0px 15px'}}><b>Enter Password:</b><input type="password" placeholder="Enter your Password..."  onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title}  style={{width:'210px'}}/></label><br />
                        <label style={{margin:'0px 0px 0px 15px'}}><b>Confirm Password:</b><input type="password" placeholder="Confirm your Password..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title}  style={{width:'210px'}}/></label>
                        <br />
                        <br />
                        <button type="button" class="btn btn-success"onClick={(event)=>this.postDataHandler(event)} >Register</button>
                        <button type="button" class="btn btn-danger"onClick={(event)=>this.postDataHandler(event)} >Cancel</button>
                        {this.state.completed ? <p style={{color:'green'}}>Note added Successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to add notes</p> : null}
            </form>    
            </div>
        );
    }
}



export default Registration;