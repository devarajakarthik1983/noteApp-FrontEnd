import React, { Component } from 'react';
import classes from './Login.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom'


//import axios from 'axios';

class Login extends Component {

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
            <div className={classes.Login}>
                <h4><span class="label label-default">LOGIN</span></h4><br/>
                <form>
                        <label><b>Enter Username:</b><input type="text" placeholder="Enter your Email..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title} /></label>
                        <br />
                        <label><b>Enter Password:</b><input type="text" placeholder="Enter your Password..." onChange={(event)=>this.setState({title: event.target.value})} 
                        value={this.state.title} /></label>
                        <br />
                        <br />
                        <button type="button" style={{marginBottom:'0px', marginRight:'-20px'}} class="btn btn-success"onClick={(event)=>this.postDataHandler(event)} >Login</button><br/>
                        <NavLink  to="/forgotusername" style={{marginRight:'20px' , fontSize:'12px', textDecoration:'underline'}}>Forgot Username</NavLink>
                        <a href="/" style={{marginRight:'-80px' , fontSize:'12px', textDecoration:'underline'}}>Forgot Password</a>
                        {this.state.completed ? <p style={{color:'green'}}>Note added Successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to add notes</p> : null}
            </form>    
            </div>
        );
    }
}



export default Login;