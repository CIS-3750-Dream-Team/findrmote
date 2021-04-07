import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import {
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineCheckCircle,
  HiOutlineEyeOff,
  HiOutlineBriefcase
} from 'react-icons/hi';

import ProfileTab from '../components/ProfileTab';
import CompanyTab from '../components/CompanyTab';
import { Session } from '../utils/contexts';

import '../../scss/profile.scss';
import dummy from '../../assests/dummy.png';


function Profile(props) {
  const session = useContext(Session);
  const [data, setData] = useState(null);
  const [page, setPage] = useState({profile: true});
  const [saved, setSaved] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!data) {
      fetch(`${process.env.REACT_APP_API_URL}/profile/:${session.id}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            console.log(res.data)
            setData(res.data);
          } else {
            swal({icon: 'error', title: 'Uh oh!', text: res.error});
          }
        })
        .catch((err) => {
          swal({icon: 'error', title: 'Uh oh!', text: 'Failed to load your profile!'});
          console.error(err);
        });
    }
  }, []);

  const sidebar = [
    {
      label: 'Profile',
      name: 'profile',
      icon: <HiOutlineUser size={25}/>,
      active: page['profile']
    },
    {
      label: 'Company',
      name: 'company',
      icon: <HiOutlineOfficeBuilding size={25}/>,
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
      icon: <HiOutlineBookmark size={25}/>
    },
    {
      label: 'Favourites',
      name: 'favourites',
      icon: <HiOutlineHeart size={25}/>
    },
    {
      label: 'Applied Jobs',
      icon: <HiOutlineCheckCircle size={25}/>,
      name: 'applied',
      visible: session.type === 'candidate'
    },
    {
      label: 'My Job Listings',
      name: 'listings',
      icon: <HiOutlineBriefcase size={25}/>,
      visible: session.type === 'employer'
    },
    {
      label: 'Hidden Jobs',
      name: 'hidden',
      icon: <HiOutlineEyeOff size={25}/>
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
    data ? (
      /* Remove the 'bg-#' classes as you add shit */
      <div id="profile" className="px-3 mt-4 minh-0 h-100">
        <div className="row justify-content-center h-100">
          <div className="d-flex flex-column col-sm col-10 minh-0 h-100">
            <div className="row">
              {/* Put the profile header here */}
              <div className="offset-lg-3 col-lg-9">
                <div className="ms-lg-1 ps-lg-3 row">
                  <div className="col-lg-2 col-sm-3">
                    { /* Update the profile image here */}
                    <img className='img-fluid profile-img' src={dummy}/>
                  </div>
                  <div className="col align-self-center">
                    <h1> {data?.f_name} {data?.l_name} </h1>
                  </div>
                  {/* Edit Save Cancel Buttons (shown on profile and company tab only) */}
                  <div className="col align-self-center">
                    {(page?.profile || page?.company) && (
                      !editable ? (
                        <div className='d-flex justify-content-end pe-2'>
                          <button onClick={handleEdit} className="btn btn-primary btn-sm px-3"> Edit </button>
                        </div>
                      ) : (
                        <div className='d-flex justify-content-end pe-2'>
                          <button className="btn btn-primary btn-sm px-3 me-3" onClick={handleSave}> Save </button>
                          <button className="btn btn-danger btn-sm px-3" onClick={handleCancel}> Cancel </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex mt-4 minh-0 h-100">
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
                        btn btn-${page[item.name] ? 'secondary' : 'light'} btn-lg text-nowrap
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
                    {(session.type && session.id) ? (
                      <ProfileTab
                        data={data}
                        session={session}
                        isEditable={editable}
                        isSaved={saved}
                        setSaved={setSaved}
                        setEditable={setEditable}
                      />
                    ) : (
                      <h3>Please login to view your profile</h3>
                    )}
                  </div>
                )}

                {page.company && (
                  <div className="d-flex flex-column">
                    <CompanyTab
                      data={data}
                      session={session}
                      isEditable={editable}
                      setEditable={setEditable}
                      isSaved={saved}
                      setSaved={setSaved}
                    />
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
    ) : (
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <div
          className="spinner-border spinner-border-lg txt-0 mb-5"
          role="status" style={{width: '5rem', height: '5rem'}}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  )
}

export default Profile;
