import React ,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './PostNavigation.css';




class  postNavigation extends Component {

  logoutHandler =()=>{
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
  }

  

  render(){

    return(
      <div className={classes.PostNavigation}>
        
        <ul>
       <label style={{color:'white', marginTop:'10px', fontSize:'25px', fontWeight:'bolder'}}>NoteApp</label>
       <label style={{color:'orange', marginTop:'10px',marginLeft:'1325px', fontSize:'15px', fontWeight:'normal'}}>Hello: {localStorage.getItem('user')}</label>
       <li><a href="/" onClick={this.logoutHandler}>Logout</a></li>   
     
      <li><NavLink  to="/create-note"  id="active">Create Post</NavLink></li>
      <li><NavLink  to="/myposts" activeClassName='is-active' >My Posts</NavLink></li>
      
      </ul>
      </div>
    )
  }

}


 

export default postNavigation;