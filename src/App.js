import React ,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom'

// import Posts from './containers/AllPostsComponent/Posts/Posts';
// import LoggedInLayout from './containers/AllPostsComponent/LoggedInLayout/LoggedInLayout';
import RegistrationLayout from './containers/AllRegistrationComponent/RegistrationLayout/RegistrationLayout';



class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <RegistrationLayout />
          {/* <LoggedInLayout>
            <Posts />
          </LoggedInLayout> */}
      </div>
      </BrowserRouter>
      
    );
  }
}
 

export default App;
