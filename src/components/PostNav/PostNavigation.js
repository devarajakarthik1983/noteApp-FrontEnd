import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './PostNavigation.css';




const postNavigation =(props)=>{

    return (
      <div className={classes.PostNavigation}>
        <ul>
       <label style={{color:'white', marginTop:'10px', fontSize:'25px', fontWeight:'bolder'}}>NoteApp</label>   
      <li><NavLink  to="/create-note"  id="active">Create Post</NavLink></li>
      <li><NavLink  to="/" activeClassName='is-active' >My Posts</NavLink></li>
      </ul>
      </div>
      
    );

}






    
        // <div className={classes.PostNavigation}>
        //     <header>
        //         <nav>
        //             <ul>
        //                 <li><NavLink to="/" activeClassName='is-active' >My Posts</NavLink></li>
        //                 <li><NavLink to="/create-note">Create Note</NavLink></li>
        //             </ul>
        //         </nav>
        //     </header>
        // </div>

  
        






export default postNavigation;