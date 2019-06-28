import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import RegisterNav from '../../../components/RegisterNav/RegisterNav';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

import ContactUs from '../ContactUs/ContactUs';
import ActivateUser from '../ActivateUser/ActivateUser';
import ForgotUsername from '../ForgotUsername/ForogotUsername';




class RegistrationLayout extends Component {

   
    render (){
      const logged = localStorage.getItem('isAuth') === 'logged';
      
       
       return (
            <div>
              {logged ? null : <RegisterNav /> } 
               
         
            <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Registration} />
            <Route path="/contactus" exact component={ContactUs} />
            <Route path='/forgotusername' exact component={ForgotUsername} />
            <Route path='/newuser/:id/:id1' exact component={ActivateUser} />

            {/* my posts component */}

           
           

           </Switch> 
           
           
            
        </div>
    );
    }

}



export default RegistrationLayout;