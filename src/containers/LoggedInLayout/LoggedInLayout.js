import React , {Component} from 'react';
import { Route, NavLink } from 'react-router-dom';

import Posts from '../Posts/Posts';
import CreatePost from '../CreatePost/CreatePost';

class LoggedInLayout extends Component {

    render (){
       //return (this.props.children);
       return (
        <div className="LoggedInLayout">
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/" activeClassName='is-active' >Home</NavLink></li>
                        <li><NavLink to="/create-post">Create Post</NavLink></li>
                    </ul>
                </nav>
            </header>
            {/* <Route path="/" exact render={() => <h1>Home</h1>} />
            <Route path="/" render={() => <h1>Home 2</h1>} /> */}
            <Route path="/" exact component={Posts} />
            <Route path="/create-post" exact component={CreatePost} />
            
        </div>
    );
    }

}



export default LoggedInLayout;