import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HiOutlineSun, HiOutlineBell, HiOutlineUserCircle, HiOutlineHome } from 'react-icons/hi';
import { IconContext } from 'react-icons';

import { Session } from './utils/contexts';

import Home from './pages/Home';
import Job from './pages/Job';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Components from './pages/Components';


function App(props) {
  const [userID, setUserID] = useState(null);
  const [userType, setUserType] = useState(null);
  const [page, setPage] = useState({home: true});
  const location = useLocation();

  useEffect(() => {
    console.log(`user_id: ${userID} (${userType})`);

    setPage({
      home: location.pathname === '/',
      job: location.pathname === '/job',
      register: location.pathname === '/register',
      login: location.pathname === '/login',
      profile: location.pathname === '/profile',
      admin: location.pathname === '/admin'
    });
  }, [userID, userType, location]);

  const session = {
    id: userID,
    type: userType,
    setID: (id) => setUserID(id),
    setType: (type) => setUserType(type)
  };


  return (
    /* Session will also need to store jobs and collections */
    <Session.Provider value={session}>
      <div className="App container d-flex flex-column vh-100">
        <header className="row justify-content-center px-3">
          <div className="col-sm col-10 mt-5">
            <div className="row align-items-center justify-content-between mt-sm-5 mt-3">
              <Link className="col" to="/">
                <img id="logo" src="logo.svg" alt=""/>
              </Link>

              {!userID ?
                <div className="col d-md-flex d-none justify-content-end me-5">
                  <Link className="btn btn-light" to="/login"> Sign in </Link>
                  <Link className="btn btn-secondary ms-3" to="/register"> Register </Link>
                </div>
              :
                <div className="col d-md-flex d-none justify-content-end me-5">
                  {/* Prompt the user on logout w/ "are you sure?" or smthn */}
                  <button className="btn btn-light fw-bolder" onClick={() => setUserID(null)}> Logout </button>
                </div>
              }

              <div className="col-5 col-xl-2 col-md-3">
                <div className="d-flex flex-row justify-content-between">
                  <IconContext.Provider value={{color: '#5a6570'}} >
                    <Link className="p-0" to="/"> <HiOutlineSun size={30} /> </Link>
                    <Link className="p-0" to="/"> <HiOutlineBell size={30} /> </Link>

                    {page.home ?
                      <Link className="p-0" to="/profile"> <HiOutlineUserCircle size={30} /> </Link>
                    :
                      <Link className="p-0" to="/"> <HiOutlineHome size={30} /> </Link>
                    }
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
        <Route exact path="/login" render={(_) => <Login />} />
        <Route exact path="/register" render={(_) => <Register />} />
        <Route exact path="/profile" render={(_) => <Profile />} />
        <Route exact path="/job:job_id" render={(_) => undefined} />
        <Route exact path="/admin" render={(_) => undefined} />

        {/* For development. Displays some common components/elements/patterns */}
        <Route exact path="/components" render={(_) => <Components />} />
        {/* An invisible button in the top left corner to set the user session */}
        <button
          className="btn btn-light position-fixed bottom-0 end-0"
          onClick={() => setUserID('6c64cc58-a53f-4edf-a4ca-e6ce8a04f1c9') || setUserType('candidate')}
        > x </button>

        <footer>
          {/* No footer has been designed yet. Do we need/want one? */}
        </footer>
      </div>
    </Session.Provider>
  );
}

export default App;
