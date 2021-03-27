import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { HiOutlineOfficeBuilding, HiOutlineSearch, HiOutlineArrowLeft } from "react-icons/hi";

import '../../scss/register.scss';

/* #TODO: Add regex for emails and URLS */

function Register(props) {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (fields?.submit) {
      console.log(fields);
  
      // Make POST request with fields
  
      // Redirect to home
      history.push('/');
    }
  }, [fields]);

  function setField(e, field) {
    const value = e.target.value;
    const error = validateField(field, value);

    setFields({...fields, [field]: {value, error}});
  }

  function validateField(field, value) {
    const check = validators[field];
    return check ? check(value).filter(c => c)[0] : undefined;
  }

  function validateForm(form, submit=false) {
    const result = form.flat().reduce((result, {type, name, field1, field2}) => {
      switch(type) {
        case 'fieldset':
          result[field1.name] = {
            value: fields[field1.name]?.value || '',
            error: validateField(field1.name, fields[field1.name]?.value || '')
          }
          result[field2.name] = {
            value: fields[field2.name]?.value || '',
            error: validateField(field2.name, fields[field2.name]?.value || '')
          };
          break;

        default:
          result[name] = {
            value: fields[name]?.value || '',
            error: validateField(name, fields[name]?.value || '')
          };
          break;
      }

      return result;
    }, {});

    const status = !(Object.entries(result).filter(([k, v]) => v.error).length > 0);

    setFields({...fields, ...result, submit: submit && status});

    return status;
  }

  // Functions that validate a required field value
  // The function acccept the value of the field and return an array
  // The array items are either null (meaning the field is valid), or an error message
  const validators = {
    'first-name': v => ([
      v.length > 0 ? null : 'please provide a first name'
    ]),
    'last-name': v => ([
      v.length > 0 ? null : 'please provide a last name'
    ]),
    'email': v => ([
      v.length > 0 ? null : 'please provide an email',
      v.includes('@') && v.includes('.') ? null : 'please provide a valid email'
    ]),
    'pass': v => ([
      v.length > 0 ? null : 'please provide a password',
      v.length > 7 ? null : 'password must be atleast 8 characters'
    ]),
    'pass-conf': v => ([
      v.length > 0 ? null : 'please confirm your password',
      v === fields['pass']?.value ? null : 'passwords do not match'
    ]),
    'company-name': v => ([
      v.length > 0 ? null : 'please provide a company name'
    ]),
    'company-desc': v => ([
      v.length > 0 ? null : 'please provide a company description'
    ]),
    'company-location': v => ([
      v.length > 0 ? null : 'please provide a company location'
    ]),
    'company-website': v => ([
      v.length > 0 ? null : 'please provide a company website'
    ])
  };


  function input({type, label, name, optional}, i, className=null) {
    const {value, error} = (fields[name] || {});

    return (
      <div key={i} className={className || "form-group w-100"}>
        <label className={`txt-0 ms-2 mb-1 ${error ? 'fw-bolder error' : ''}`}>
          {label} {optional ? <i> (Optional) </i> : null}
        </label>
        <label className="txt-0 ms-2 mb-1 error"> {error ? error : null} </label>
        <input
          className={`form-control mb-4 px-3 fs-5 ${error ? 'error' : ''}`}
          onChange={e => setField(e, name)} value={value || ''}
          required={!optional} type={type}
        />
      </div>
    );
  }

  function textarea({type, label, name, optional}, i) {
    const {value, error} = (fields[name] || {});

    return (
      <div key={i} className="form-group w-100">
        <label className={`txt-0 ms-2 mb-1 ${error ? 'fw-bolder error' : ''}`}>
          {label} {optional ? <i> (Optional) </i> : null}
        </label>
        <label className="txt-0 ms-2 mb-1 error"> {error ? error : null} </label>
        <textarea
          className={`form-control mb-4 px-3 fs-6 ${error ? 'error' : ''}`}
          onChange={e => setField(e, name)} value={value || ''}
          required={!optional} type={type}
        />
      </div>
    )
  }

  function fieldset({field1, field2}, i) {
    return (
      <fieldset key={i} className="d-flex">
        {input(field1, 0, "form-group me-4 w-100")} {input(field2, 1)}
      </fieldset>
    );
  }

  const layouts = {
    credentials: [
      {
        type: 'fieldset',
        field1: {type: 'text', label: 'First Name', name: 'first-name'},
        field2: {type: 'text', label: 'Last Name', name: 'last-name'}
      },
      {type: 'text', label: 'Email', name: 'email'},
      {type: 'password', label: 'Password', name: 'pass'},
      {type: 'password', label: 'Confirm Password', name: 'pass-conf'}
    ],
    education: [
      {type: 'text', label: 'Education', name: 'education', optional: true},
      {type: 'text', label: 'Degree & Major', name: 'education-type', optional: true},
      {
        type: 'fieldset',
        field1: {type: 'date', label: 'Start Date', name: 'start-date'},
        field2: {type: 'date', label: 'End Date', name: 'end-date'}
      }
    ],
    media: [
      {type: 'url', label: 'Github', name: 'link-github', optional: true},
      {type: 'url', label: 'LinkedIn', name: 'link-linkedin', optional: true},
      {type: 'url', label: 'Personal Website', name: 'link-website', optional: true}
    ],
    company: [
      {type: 'text', label: 'Company Name', name: 'company-name'},
      {type: 'textarea', label: 'Company Description', name: 'company-desc'},
      {type: 'text', label: 'Company Location', name: 'company-location'},
      {type: 'url', label: 'Company Website', name: 'company-website'}
    ]
  }

  const forms = Object.entries(layouts).reduce(
    (forms, [layout, fields]) => ({
      ...forms,
      [layout]: fields.map(
        (field, i) => {
          switch(field.type) {
            case 'fieldset': return fieldset(field, i);
            case 'textarea': return textarea(field, i);
            default: return input(field, i);
          }
        }
      ).flat()
    }), {}
  );


  return (
    <div id="register" className="row">
      <div className="col pe-0 pt-1 pt-sm-2 me-1">
        {progress > 0 && (
          <button
            className="btn d-none d-sm-flex btn-light fs-2 p-0 mt-5"
            onClick={() => setProgress(progress - 1)}
          > <HiOutlineArrowLeft /> </button>
        )}
      </div>

      <div className="col-xl-6 col-lg-8 col-10 d-flex flex-column justify-content-between align-items-center">
        {progress === 0 && (
          <div className="registration-home d-flex flex-column mt-5 w-100">
            <h1 className="mb-4 fw-bold"> Create an Account </h1>

            <button
              className="btn btn-secondary border d-flex justify-content-between align-items-center fs-3 px-4 py-3 mb-4" 
              onClick={() => setUser('candidate') || setProgress(1)}
            > I am Looking for a Job <HiOutlineSearch /> </button>

            <button
              className="btn btn-secondary border d-flex justify-content-between align-items-center fs-3 px-4 py-3" 
              onClick={() => setUser('employer') || setProgress(1)}
            > I am an Employer <HiOutlineOfficeBuilding /> </button>
          </div>
        )}

        {progress === 1 && user === 'candidate' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* First form for candidates */}
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Account Credentials </h5>

            {forms.credentials}

            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => validateForm(layouts.credentials) && setProgress(2)}
            > Next </button>
          </div>
        )}

        {progress === 2 && user === 'candidate' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* Second form for candidates */}
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Educational Background </h5>

            {forms.education}
            <div className='divider mb-4 mx-2'></div>
            {forms.media}

            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => validateForm([layouts.education, layouts.media], true) }
            > Register </button>
          </div>
        )}


        {progress === 1 && user === 'employer' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Information for Company Contact </h5>

            {forms.credentials}

            <button
              type="button"
              className="btn btn-primary mt-3 w-100"
              onClick={() => validateForm(layouts.credentials) && setProgress(2)}
            > Next </button>
          </div>
        )}

        {progress === 2 && user === 'employer' && (
          <div className="registration-form d-flex flex-column mt-5 w-100">
            {/* Second form for employers */}
            <h1 className="fw-bold mb-2"> Register </h1>
            <h5 className="txt-0 mb-4"> Educational Background </h5>

            {forms.company}

            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => validateForm(layouts.company, true)}
            > Register </button>
          </div>
        )}
      </div>

      <div className="col"></div>

      <div className="fixed-bottom d-flex justify-content-center w-100 bg-0">
        <div className="d-flex justify-content-center col-xl-6 col-lg-8 col-10">
          <div className="indicators d-flex justify-content-around px-md-4 px-1 mb-5 mt-4 w-25">
            {[0, 1, 2].map(i => (
              <button key={i}
                className={`btn btn-secondary p-0 mb-3 ${progress === i ? 'active' : ''}`} 
                onClick={() => setProgress(i < progress ? i : progress)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
