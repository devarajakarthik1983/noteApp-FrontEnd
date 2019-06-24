import React , {Component} from 'react';
import { Route, NavLink ,Switch } from 'react-router-dom';

import Posts from '../Posts/Posts';
import CreatePost from '../CreatePost/CreatePost';
import classes from './LoggedInLayout.css';
import UpdatePost from '../UpdatePost/UpdatePost';

class LoggedInLayout extends Component {

    render (){
       //return (this.props.children);
       return (
        <div className={classes.LoggedInLayout}>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/" activeClassName='is-active' >My Posts</NavLink></li>
                        <li><NavLink to="/create-note">Create Note</NavLink></li>
                    </ul>
                </nav>
            </header>
            {/* <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/" render={() => <h1>Home 2</h1>} /> */}
           <Switch>
           <Route path="/" exact component={Posts} />
            <Route path="/create-note" exact component={CreatePost} />
            <Route path="/update-note/:id" exact component={UpdatePost} />
           </Switch>
           
          
            
            
        </div>
    );
    }

}



export default LoggedInLayout;