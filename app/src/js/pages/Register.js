import React, { useState } from 'react';
import { HiOutlineOfficeBuilding, HiOutlineSearch } from "react-icons/hi";

import '../../scss/register.scss';


function Register(props) {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [formdata, setFormdata] = useState({});

  function setField(e, field) {
    setFormdata(prev => {
      prev[field] = e.target.value;

      return prev;
    });
  }

  function submit() {
    console.log(formdata);
  }


  return (
    <div id="register" className="row justify-content-center flex-grow-1 w-100">
      <div className="col-xl-6 col-lg-8 col-10 d-flex flex-column justify-content-between align-items-center">
        {progress === 0 && (
          <div className="registration-home d-flex flex-column mt-5 w-100">
            <h1 className="mb-4 fw-bold"> Create an Account </h1>
            <button
              className="btn btn-secondary border d-flex justify-content-between align-items-center fs-3 px-4 py-3 mb-4" 
              onClick={() => setUser('candidate') || setProgress(1)}
            >
              I am Looking for a Job <HiOutlineSearch />
            </button>
            <button
              className="btn btn-secondary border d-flex justify-content-between align-items-center fs-3 px-4 py-3" 
              onClick={() => setUser('employer') || setProgress(1)}
            >
              I am an Employer <HiOutlineOfficeBuilding />
            </button>
          </div>
        )}

        {progress === 1 && user === 'candidate' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* First form for candidates */}
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Account Credentials </h5>
            <fieldset className="d-flex">
              <div className="form-group me-4 w-100">
                <label className="txt-0 ms-2 mb-1"> First Name </label>
                <input 
                  className='form-control mb-4 px-3 fs-5' type="text" 
                  onChange={e => setField(e, 'first-name')} value={formdata['first-name']}
                />
              </div>
              <div className="form-group w-100">
                <label className="txt-0 ms-2 mb-1"> Last Name </label>
                <input 
                  className='form-control mb-4 px-3 fs-5' type="text" 
                  onChange={e => setField(e, 'last-name')} value={formdata['last-name']}
                />
              </div>
            </fieldset>
            <div className="form-group">
              <label className="txt-0 ms-2 mb-1"> Email </label>
              <input 
                className='form-control mb-4 px-3 fs-5' type="text" 
                onChange={e => setField(e, 'email')} value={formdata['email']}
              />
            </div>
            <div className="form-group">
              <label className="txt-0 ms-2 mb-1"> Password </label>
              <input 
                className='form-control mb-4 px-3 fs-5' type="password" 
                onChange={e => setField(e, 'pass')} value={formdata['pass']}
              />
            </div>
            <div className="form-group">
              <label className="txt-0 ms-2 mb-1"> Confirm Password </label>
              <input 
                className='form-control mb-4 px-3 fs-5' type="password" 
                onChange={e => setField(e, 'pass-conf')} value={formdata['pass-conf']}
              />
            </div>
            <button className="btn btn-primary mt-3 w-100" onClick={() => setProgress(2)} type="button">
              Next
            </button>
          </div>
        )}

        {progress === 2 && user === 'candidate' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* Second form for candidates */}
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Educational Background </h5>
            <div className="form-group">
              <label className="txt-0 ms-2 mb-1"> Education <i> (Optional) </i> </label>
              <input
                className='form-control mb-4 px-3 fs-5' type="text"
                onChange={e => setField(e, 'eduction')} value={formdata['eduction']}
              />
            </div>
            <div className="form-group">
              <label className="txt-0 ms-2 mb-1"> Degree & Major <i> (Optional) </i> </label>
              <input
                className='form-control mb-4 px-3 fs-5' type="text"
                onChange={e => setField(e, 'education-level')} value={formdata['education-level']}
              />
            </div>
            <fieldset className="d-flex">
              <div className="form-group me-4 w-100">
                <label className="txt-0 ms-2 mb-1"> Start Date </label>
                <input
                  className='form-control mb-4 px-3 fs-5' type="date"
                  onChange={e => setField(e, 'education-start')} value={formdata['education-start']}
                />
              </div>
              <div className="form-group w-100">
                <label className="txt-0 ms-2 mb-1"> End Date </label>
                <input
                  className='form-control mb-4 px-3 fs-5' type="date"
                  onChange={e => setField(e, 'education-end')} value={formdata['education-end']}
                />
              </div>
            </fieldset>

            <fieldset className="mt-3">
              <div className="form-group">
                <label className="txt-0 ms-2 mb-1"> Github <i> (Optional) </i> </label>
                <input
                  className='form-control mb-3 px-3 fs-5' type="url"
                  onChange={e => setField(e, 'link-github')} value={formdata['link-github']}
                />
              </div>
              <div className="form-group">
                <label className="txt-0 ms-2 mb-1"> LinkedIn <i> (Optional) </i> </label>
                <input
                  className='form-control mb-3 px-3 fs-5' type="url"
                  onChange={e => setField(e, 'link-linkedin')} value={formdata['link-linkedin']}
                />
              </div>
              <div className="form-group">
                <label className="txt-0 ms-2 mb-1"> Personal Website <i> (Optional) </i> </label>
                <input
                  className='form-control mb-4 px-3 fs-5' type="url"
                  onChange={e => setField(e, 'link-website')} value={formdata['link-website']}
                />
              </div>
            </fieldset>

            <button className="btn btn-primary mt-3 w-100" onClick={() => submit()} type="button">
              Next
            </button>
          </div>
        )}


        {progress === 1 && user === 'employer' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* First form for employers */}
          </div>
        )}

        {progress === 2 && user === 'employer' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* Second form for employers */}
          </div>
        )}

        <div className="fixed-bottom d-flex justify-content-center w-100 bg-0">
          <div className="d-flex justify-content-center col-xl-6 col-lg-8 col-10">
            <div className="indicators d-flex justify-content-around px-md-4 px-1 mb-5 mt-4 me-3 w-25">
              {[0, 1, 2].map(i => (
                <button key={i}
                  className={`btn btn-secondary p-0 mb-3 ${progress === i ? 'active' : ''}`} 
                  onClick={() => setProgress(i)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
