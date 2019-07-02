import React , {Component} from 'react';
import { Route, Switch } from 'react-router-dom';


import RegisterNav from '../../../components/RegisterNav/RegisterNav';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

import ContactUs from '../ContactUs/ContactUs';
import ActivateUser from '../ActivateUser/ActivateUser';

import ForgotPassword from '../ForgotPassword/ForgotPassword';
import PasswordActivation from '../PasswordActivation/PasswordActivation';





class RegistrationLayout extends Component {
  
   
    render (){
      
      const logged = localStorage.getItem('isAuth') ? true : false;
      
       
       return (
            <div>
              {logged ? null : <RegisterNav /> } 
               
         
            <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" exact component={Registration} />
            <Route path="/contactus" exact component={ContactUs} />
            <Route path='/forgotpassword' exact component={ForgotPassword} />
            <Route path='/newuser/:id/:id1' exact component={ActivateUser} />
            <Route path='/passwordactivation/:id/:id1' exact component={PasswordActivation} />
         

           
           

           </Switch> 
           
           
            
        </div>
    );
    }

}



export default RegistrationLayout;