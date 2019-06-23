import React ,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom'

import Posts from './containers/Posts/Posts';
import LoggedInLayout from './containers/LoggedInLayout/LoggedInLayout';



class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
      <LoggedInLayout>
      <Posts />
      </LoggedInLayout>
     
    </div>
      </BrowserRouter>
      
    );
  }
}


export default App;
