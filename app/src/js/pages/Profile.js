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
import ProfileTab from '../components/ProfileTab';
import CompanyTab from '../components/CompanyTab';

import { Session } from '../utils/contexts';

import '../../scss/profile.scss';
import dummy from '../../assests/dummy.png';

function Profile(props) {
  const session = useContext(Session);
  const [page, setPage] = useState({profile: true});
  const [saved, setSaved] = useState(false);
  const [editable, setEditable] = useState(false);

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

  const handleEdit = () => {
    setEditable(true);
  }

  const handleCancel = () => {
    setEditable(false);
    setSaved(false);
  }

  const handleSave = () => {
    // when save is clicked the saved value gets passed down and triggers a form submission
    setSaved(true);
  }

  return (
    /* Remove the 'bg-#' classes as you add shit */
    <div id="profile" className="px-3 h-100">
      <div className="row justify-content-center h-100">
        <div className="col-sm col-10 mt-5 h-100">
          <div className="row">
            {/* Put the profile header here */}
            <div className="offset-lg-3 col-lg-9">
              <div className="ms-lg-4 mx-lg-1 px-lg-3 row">
                <div className="col-lg-2">
                  <img className='img-fluid profile-img' src={dummy}/> { /* Update the profile image here */}
                </div>
                <div className="col-lg-4 align-self-center">
                  <h1>Arthur Read</h1> { /* TODO: update the profile name here */ }
                </div>
                {/* Edit Save Cancel Buttons */}
                <div className="col-lg-4 align-self-center">
                  {
                    // show them on profile tab and company tab only
                   (page.profile || page.company) && (!editable ? <button onClick={handleEdit} 
                      className="btn btn-primary btn-sm">Edit</button> : (
                      <div className='row'>
                        <div className="col-3">
                          <button onClick={handleSave} className="btn btn-primary btn-sm mr-3">
                            Save
                          </button>
                        </div>
                        <div className="col-3">
                          <button onClick={handleCancel}
                            className="btn btn-danger btn-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                      ))
                  }
                </div>    
              </div>
            </div>

          </div>

          <div className="row h-100 mt-4">
            <div className="nav-bar col-lg col-lg-3 row-sm">
              <div className="d-lg-none d-flex bg-1 flex-column align-items-center py-3 w-100">
                {/* Mobile Navigation */} mobile nav (todo)
              </div>
              <div className="d-lg-flex d-none flex-column align-items-end">
                {/* Desktop Sidebar Navigation */}
                {sidebar.filter(item => item.visible ?? true).map((item, i)=> (
                  <button 
                  key={i}
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

            <div className="content col-lg row-sm ms-lg-4 mt-lg-0 mt-4 h-100">
              {page.profile && (
                <div className="d-flex flex-column">
                  {/* Put the Profile tab contents here (Issue #35) */}
                  { (session.type && session.id) ? (<ProfileTab profileInformation={{
                      firstName: 'Arthur',
                      lastName: 'Read',
                      email: 'john@doe.com',
                    }}  
                    isEditable={editable} 
                    session={session.type}
                    isSaved={saved}
                    setSaved={setSaved}
                    setEditable={setEditable}
                  />) : (<h3>Please login to view your profile</h3>)}
                </div>
              )}

              {page.company && (
                <div className="d-flex flex-column">
                  {/* Put the Company tab contents here (Issue #36) */}
                  {(session.type === 'employer' && session.id) ? 
                    <CompanyTab 
                      isEditable={editable} 
                      isSaved={saved}
                      companyInformation={{
                        companyName: 'Desire2Learn',
                        location: 'Kitchener, ON, Canada',
                        site: 'https://dtl.com',
                        companyEmail: 'support@d2l.com',
                        companyPhone: '1 (222) 333-4445',
                        companyDescription: 'Courselink company',
                      }}
                      setSaved={setSaved}
                      setEditable={setEditable}
                    /> : (<h3>Please login to view your profile</h3>)}
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
