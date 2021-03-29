import React, { useState, useContext } from 'react';
import {
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineCheckCircle,
  HiOutlineEyeOff,
  HiOutlineBriefcase
} from "react-icons/hi";

import { Session } from '../utils/contexts';


function Profile(props) {
  const session = useContext(Session);
  const [page, setPage] = useState({profile: true});

  const sidebar = [
    {
      label: 'Profile',
      name: 'profile',
      icon: <HiOutlineUser size={30}/>,
      active: page['profile']
    },
    {
      label: 'Company',
      name: 'company',
      icon: <HiOutlineOfficeBuilding size={30}/>,
      visible: session.type === 'employer'
    },
    {
      label: 'COLLECTIONS',
      icon: <HiOutlineViewGrid className="ms-2" size={23} />,
      classes: 'btn d-flex align-items-center fs-5 txt-0 mb-3 me-2'
    },
    {
      label: 'Bookmarks',
      name: 'bookmarks',
      icon: <HiOutlineBookmark size={30}/>
    },
    {
      label: 'Favourites',
      name: 'favourites',
      icon: <HiOutlineHeart size={30}/>
    },
    {
      label: 'Applied Jobs',
      icon: <HiOutlineCheckCircle size={30}/>,
      name: 'applied',
      visible: session.type === 'candidate'
    },
    {
      label: 'My Job Listings',
      name: 'listings',
      icon: <HiOutlineBriefcase size={30}/>,
      visible: session.type === 'employer'
    },
    {
      label: 'Hidden Jobs',
      name: 'hidden',
      icon: <HiOutlineEyeOff size={30}/>
    }
  ];


  return (
    /* Remove the 'bg-#' classes as you add shit */
    <div id="profile" className="px-3 h-100">
      <div className="row justify-content-center h-100">
        <div className="col-sm col-10 mt-5 h-100">
          <div className="row h-25 bg-2">
            {/* Put the profile header here */}
          </div>

          <div className="row h-100 mt-4">
            <div className="nav-bar col-lg col-lg-3 row-sm">
              <div className="d-lg-none d-flex bg-1 flex-column align-items-center py-3 w-100">
                {/* Mobile Navigation */} mobile nav (todo)
              </div>
              <div className="d-lg-flex d-none flex-column align-items-end">
                {/* Desktop Sidebar Navigation */}
                {sidebar.filter(item => item.visible ?? true).map(item => (
                  <button 
                    onClick={() => item.name && setPage({[item.name]: true})}
                    className={item.classes || (`
                      btn btn-${page[item.name] ? 'secondary' : 'light'} btn-lg
                      d-flex align-items-center flex-shrink-1 fs-4 py-2 px-3 mb-3
                    `)
                  }>
                    <span className="me-3"> {item.label} </span> {item.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="content col-lg row-sm bg-1 ms-lg-4 mt-lg-0 mt-4 h-100">
              {page.profile && (
                <div className="d-flex flex-column">
                  {/* Put the Profile tab contents here (Issue #35) */}
                </div>
              )}

              {page.company && (
                <div className="d-flex flex-column">
                  {/* Put the Company tab contents here (Issue #36) */}
                </div>
              )}

              {page.bookmarks && (
                <div className="d-flex flex-column">
                  <h1 className="fw-normal mb-3"> Bookmarks </h1>
                  {/* Put the bookmarks table here */}
                </div>
              )}

              {page.favourites && (
                <div className="d-flex flex-column">
                  <h1 className="fw-normal mb-3"> Favourites </h1>
                  {/* Put the favourites table here */}
                </div>
              )}

              {page.applied && (
                <div className="d-flex flex-column">
                  <h1 className="fw-normal mb-3"> Applied Jobs </h1>
                  {/* Put the Applied Jobs table here */}
                </div>
              )}

              {page.hidden && (
                <div className="d-flex flex-column">
                  <h1 className="fw-normal mb-3"> Hidden Jobs </h1>
                  {/* Put the Hidden Jobs table here */}
                </div>
              )}

              {page.listings && (
                <div className="d-flex flex-column">
                  {/* Put the Job Listings table here */}
                  <h1 className="fw-normal mb-3"> My Job Listings </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
