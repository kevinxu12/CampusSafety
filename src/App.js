import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AdminDashboard from './Components/AdminDashboard'
import logo from './logo.svg';


class App extends Component {

  render () {
    return (
      <div>
        <BrowserRouter> 
          <Route exact path = "/" component = {Welcome} />
          <Route path = "/login" component = {Login} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/admin_dashboard" component = {AdminDashboard} />
        </BrowserRouter>

      </div>
    )
  }
}

export default App;
