import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import Components from './pages/Components';

function App(props) {
  return (
    <Router>
      <div className="App container">
        <header className="row mx-4 mx-sm-2 mt-5">
          {/* Replace all this (Issue #4) */}
          <h1 className="col">findrmote</h1>
          <nav className="nav col align-items-center justify-content-end w-25 ">
            <Link className="btn btn-link" to="/home"> Home </Link>
            <Link className="btn btn-link" to="/components"> Components </Link>
          </nav>
        </header>

        <Route exact path="/home" render={(_) => <Home />} />
        <Route exact path="/components" render={(_) => <Components />} />

        <footer>
          {/* No footer has been design yet. Do we need/want one? */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
