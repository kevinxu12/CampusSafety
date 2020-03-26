import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

class App extends Component {
    render () {
      return (
        <div>
          <BrowserRouter>
            <Route path = "/admin_dashboard" component = {AdminDashboard} />
          </BrowserRouter>
        </div>
      );
    }
}

export default App;
