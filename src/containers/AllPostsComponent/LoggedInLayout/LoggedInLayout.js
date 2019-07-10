import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from '../Posts/Posts';
import CreatePost from '../CreatePost/CreatePost';
import UpdatePost from '../UpdatePost/UpdatePost';
import PostNavigation from '../../../components/PostNav/PostNavigation';


class LoggedInLayout extends Component {

    render (){
       

       //return (this.props.children);
       return (
            <div>
                <PostNavigation />
            <Switch>
          <Route path="/myposts" exact component={Posts} /> 
           <Route path="/create-note" exact component={CreatePost} /> 
           <Route path="/update-note/:id" exact component={UpdatePost} />
           </Switch> 
           
           
            
        </div>
    );
    }

}



export default LoggedInLayout;