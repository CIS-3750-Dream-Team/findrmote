import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import Profile from './pages/Profile'
import Home from './pages/Home'

import '../scss/main.scss';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='App p-5 w-25'>
          <h1> findrmote </h1>

          <nav className="nav flex-column align-items-start w-25 my-3">
            <Link className='btn btn-link' to='/home'> Home </Link>
            <Link className='btn btn-link' to='/profile'> Profile </Link>
          </nav>

          <Route exact path='/home' render={props => <Home />} />
          <Route exact path='/profile' render={props => <Profile />} />
        </div>
      </Router>
    );
  }
}

export default App;
