import React ,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom'

import Posts from './containers/AllPostsComponent/Posts/Posts';
import LoggedInLayout from './containers/AllPostsComponent/LoggedInLayout/LoggedInLayout';
import RegistrationLayout from './containers/AllRegistrationComponent/RegistrationLayout/RegistrationLayout';



class App extends Component {

 

  render(){
    const logged = localStorage.getItem('isAuth') ? true : false;

    return(
      <BrowserRouter>
        <div>
          {logged ? null: <RegistrationLayout />}
          {logged ?  <LoggedInLayout>
            {logged ? <Posts /> :null}
          </LoggedInLayout> :null}
      </div>
      </BrowserRouter>
    );
  }
}
 

export default App;
