import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { HiOutlineSun, HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
import { IconContext } from "react-icons";

import Home from './pages/Home';
import Job from './pages/Job';
import Components from './pages/Components';

function App(props) {
  return (
    <Router>
      <div className="App container">
        <header className="row justify-content-center">
          <div className="col-sm col-10 mt-5">
            <div className="row align-items-center justify-content-between mt-sm-5 mt-3">
              <Link className="col" to="/">
                <img id="logo" src="logo.svg" alt=""/>
              </Link>

              <div className="col d-md-flex d-none justify-content-end me-5">
                <Link className="btn btn-light" to="/login"> Sign in </Link>
                <Link className="btn btn-secondary ms-3" to="/register"> Register </Link>
              </div>

              <div className="col-5 col-xl-2 col-md-3">
                <div className="d-flex flex-row justify-content-between">
                  <IconContext.Provider value={{color: '#5a6570'}} >
                    <Link className="p-0" to="/"> <HiOutlineSun size={30} /> </Link>
                    <Link className="p-0" to="/register"> <HiOutlineBell size={30} /> </Link>
                    <Link className="p-0" to="/profile"> <HiOutlineUserCircle size={30} /> </Link>
                  </IconContext.Provider>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Replace 'undefined' as pages are created */}
        <Route exact path="/" render={(_) => <Home />} />
        <Route exact path="/login" render={(_) => undefined} />
        <Route exact path="/register" render={(_) => undefined} />
        <Route exact path="/profile" render={(_) => undefined} />
        <Route exact path="/job:job_id" render={(_) => <Job />} />
        <Route exact path="/admin" render={(_) => undefined} />

        {/* For development. Displays some common components/elements/patterns */}
        <Route exact path="/components" render={(_) => <Components />} />

        <footer>
          {/* No footer has been designed yet. Do we need/want one? */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
