import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './RegisterNav.css';




const registerNav =(props)=>{

    return (
      <div className={classes.RegisterNav}>
        <ul>
       <label style={{color:'white', marginTop:'10px', fontSize:'25px', fontWeight:'bolder'}}>NoteApp</label>   
       <li><NavLink  to="/contactus" activeClassName='is-active' >Contact-Us</NavLink></li>
      <li><NavLink  to="/register"  id="active">Registration</NavLink></li>
      <li><NavLink  to="/" activeClassName='is-active' >Login</NavLink></li>
      </ul>
      </div>
      
    );

}

export default registerNav;