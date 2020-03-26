import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Signup from './Components/Signup'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter> 
          <Route exact path = "/" component = {Welcome} />
          <Route path = "/login" component = {Login} />
          <Route path = "/signup" component = {Signup} />
  
        </BrowserRouter>

      </div>
    )
  }
}

export default App;
