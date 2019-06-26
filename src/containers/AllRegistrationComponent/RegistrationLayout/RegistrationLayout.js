import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import RegisterNav from '../../../components/RegisterNav/RegisterNav';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import LoggedInLayout from '../../AllPostsComponent/LoggedInLayout/LoggedInLayout';
import ContactUs from '../ContactUs/ContactUs';

class RegistrationLayout extends Component {

   

    render (){
       return (
            <div>
               <RegisterNav />
       
         
            <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Registration} />
            <Route path="/user" exact component={LoggedInLayout} />
            <Route path="/contactus" exact component={ContactUs} />
            {/* <Route path="/create-note" exact component={CreatePost} />
            <Route path="/update-note/:id" exact component={UpdatePost} /> */}
           </Switch> 
           
           
            
        </div>
    );
    }

}



export default RegistrationLayout;