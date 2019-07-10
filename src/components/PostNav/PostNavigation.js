import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './PostNavigation.css';
import axios from 'axios';




class  postNavigation extends Component {
//localStorage.getItem('isAuth');
  logoutHandler =(event)=>{
    event.preventDefault();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
   axios.post('https://noteappbackend.herokuapp.com/logout')
     .then(response=> {
      console.log(response);
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
      window.location.replace("http://localhost:3000/");  
     })
     .catch(function (error) {
       console.log(error)
     })
  }

  

  render(){

    return(
      <div className={classes.PostNavigation}>
        
        <ul>
       <label style={{color:'white', marginTop:'10px', fontSize:'25px', fontWeight:'bolder'}}>NoteApp</label>
       <label style={{color:'orange', marginTop:'10px',marginLeft:'1325px', fontSize:'15px', fontWeight:'normal'}}>Hello: {localStorage.getItem('user')}</label>
       <li><a href="/" onClick={(event)=>this.logoutHandler(event)}>Logout</a></li>   
     
      <li><NavLink  to="/create-note"  id="active">Create Post</NavLink></li>
      <li><NavLink  to="/myposts" activeClassName='is-active' >My Posts</NavLink></li>
      
      </ul>
      </div>
    )
  }

}


 

export default postNavigation;