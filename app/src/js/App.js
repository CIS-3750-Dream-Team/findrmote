import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Components from './pages/Components';


function App(props) {
  return (
    <Router>
      <div className='App p-5'>
        <h1> findrmote </h1>

        <nav className='nav flex-column align-items-start w-25 my-3'>
          <Link className='btn btn-link' to='/home'> Home </Link>
          <Link className='btn btn-link' to='/profile'> Profile </Link>
        </nav>

        <Route exact path='/home' render={_ => <Home />} />
        <Route exact path='/profile' render={_ => <Profile />} />

        <Route exact path='/components' render={_ => <Components />} />
      </div>
    </Router>
  );
}

export default App;
