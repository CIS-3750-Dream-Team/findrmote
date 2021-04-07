import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import swal from 'sweetalert';
import {
  profileValidationCandidateSchema,
  profileValidationEmployerSchema,
  zeroValidationSchema,
} from '../utils/validators';

import '../../scss/profile-tab.scss';
import '../../scss/error.scss';


/**
 * @see - https://formik.org/docs/api/useFormikContext
 * @param {Object} props
 * @returns - A helper React component that uses React Context to grab all the form values of Formik and trigger form submission manually
 */
function SubmitFormOnSave({ isSaved, setSaved, setEditable, session }) {
  const {submitForm, isSubmitting, validateForm, setErrors, setTouched} = useFormikContext();

  useEffect(() => {
    (async () => {
      // if form is not valid return
      if (isSaved && !isSubmitting) {
        try {
          const errors = await validateForm();

          if (errors && Object.keys(errors).length === 0) {
            // Form is valid, do any success call
            await submitForm();
            setEditable(false);
            setSaved(false);

            return;
          }

          setTouched({ ...touchAllFields(session) });
          setErrors({ ...errors });
          setSaved(false);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [isSaved]);

  return null;
}

/**
 * @param {string} session - The user session - candidate or employer
 * @returns - an object with all the form fields set to true
 */
function touchAllFields(session) {
  let touched = {firstName: true, lastName: true, email: true};

  if (session === 'candidate') {
    touched = {
      ...touched,
      github: true,
      linkedIn: true,
      personalSite: true,
      getNotifications: true,
      employerVisible: true,
      startDate: true,
      endDate: true
    };

    return touched;
  }

  return touched;
}

/**
 * Function that sets up the initial values for form population and the validation schema
 * @param {string} session - Candidate or Employer
 * @param {Object} userData - Pofile information about the user
 * @returns a tuple of the initial form values and the validation schema based on the session
 */
function getInitialValuesAndSchema(session, userData) {
  let initialValues = {};
  let validationSchema = zeroValidationSchema;

  if (userData) {
    if (session === 'candidate') {
      // Set initial values for candidate
      initialValues = {
        firstName: userData?.f_name ?? '',
        lastName: userData?.l_name ?? '',
        email: userData?.email ?? '',
        education: userData?.meta?.education ?? '',
        degree: userData?.meta?.education_lvl ?? '',
        github: userData?.meta?.lnk_github ?? '',
        linkedIn: userData?.meta?.lnk_linkedin ?? '',
        personalSite: userData?.meta?.lnk_website ?? '',
        startDate: userData?.meta?.s_date ?? '',
        endDate: userData?.meta?.e_date ?? '',
        getNotifications: userData?.notifications ?? false,
        employerVisible: userData?.employer_visible ?? false,
      };

      // Set validation for candidate
      validationSchema = profileValidationCandidateSchema;

    } else if (session === 'employer') {
      // Set initial values for employer
      initialValues = {
        firstName: userData?.f_name ?? '',
        lastName: userData?.l_name ?? '',
        email: userData?.email ?? ''
      };

      // Set validation for employer
      validationSchema = profileValidationEmployerSchema;
    }
  }

  return [initialValues, validationSchema];
}


/**
 * @param {Object} props
 * @returns - The React Component that displays the Profile Form
 */
export default function ProfileTab({data, session, isEditable, isSaved, setSaved, setEditable}) {
  const [initialValues, validationSchema] = getInitialValuesAndSchema(session.type, data);
  const history = useHistory();

  function updateProfile(values) {
    console.log(values)
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: 'POST',
      body: JSON.stringify({values, userID: session.id, type: session.type, form: 'profile'}),
      headers: {'Content-Type': 'application/json'},
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          swal({icon: 'success', title: 'Profile Updated!'});

          history.push('/');
          history.push('/profile');

        } else {
          swal({icon: 'error', title: 'Uh oh!', text: res.error});
        }
      })
      .catch((err) => {
        swal({icon: 'error', title: 'Uh oh!', text: 'Failed to update your profile!'});
        console.error(err);
      });
  }

  return (
    <div className='my-1 px-2 justify-content-between profile-tab'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={updateProfile}
        validateOnBlur
      >
        {(formikProps) => {
          const props = {...formikProps, isEditable};

          return (
            <div>
              <ProfileCommon {...props} />
              <div className='divider mx-2 mb-4'></div>
              {session.type === 'candidate' ? <ProfileCandidateOptional {...props} /> : null}

              {/* A React Component that handles the form submission trigger */}
              <SubmitFormOnSave
                isSaved={isSaved}
                setSaved={setSaved}
                setEditable={setEditable}
                session={session.type}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
}


/**
 * @param {Object} props 
 * @returns - The React Form with common fields between candidate and the employer
 */
function ProfileCommon({ errors, touched, isEditable }) {
  return (
    <Form className='row'>
      {/* First Name Field */}
      <div className='form-group col-12 col-md-6'>
        <label
          className={errors?.firstName && touched?.firstName ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='firstName'
        >
          <span className={errors?.firstName && touched?.firstName ? 'fw-bolder me-1' : null}> First Name </span>
          <ErrorMessage name='firstName' />
        </label>
        <Field
          type='text'
          id='firstName'
          name='firstName'
          placeholder='Enter your first name'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Last Name Field */}
      <div className='form-group col-12 col-md-6'>
        <label
          className={errors?.lastName && touched?.lastName ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='lastName'
        >
          <span className={errors?.lastName && touched?.lastName ? 'fw-bolder me-1' : null}> Last Name </span>
          <ErrorMessage name='lastName' />
        </label>
        <Field
          type='text'
          id='lastName'
          name='lastName'
          placeholder='Enter your last name'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Email Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.email && touched?.email ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='email'
        >
          <span className={errors?.email && touched?.email ? 'fw-bolder me-1' : null}> Email </span>
          <ErrorMessage name='email' />
        </label>
        <Field
          type='email'
          id='email'
          name='email'
          placeholder='Enter your email'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>
    </Form>
  );
}


/**
 * @param {Object} props 
 * @returns - The React Form with optional fields for candidates
 */
function ProfileCandidateOptional({ errors, touched, isEditable }) {
  return (
    <Form className='row mb-4'>
      {/* Education Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.education && touched?.education ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='education'
        >
          <span className={errors?.education && touched?.education ? 'fw-bolder me-1' : null}> Education </span>
          <ErrorMessage name='education' />
        </label>
        <Field
          type='text'
          id='education'
          name='education'
          placeholder='Enter your education'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Degree Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.degree && touched?.degree ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='degree'
        >
          <span className={errors?.degree && touched?.degree ? 'fw-bolder me-1' : null}> Degree </span>
          <ErrorMessage name='degree' />
        </label>
        <Field
          type='text'
          id='degree'
          name='degree'
          placeholder='Enter your degree'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Start Date Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.startDate && touched?.startDate ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='startDate'
        >
          <span className={errors?.startDate && touched?.startDate ? 'fw-bolder' : null}> Start Date </span>
          <ErrorMessage name='startDate' />
        </label>
        <Field
          type='date'
          id='startDate'
          name='startDate'
          placeholder='Start Date'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* End date Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.endDate && touched?.endDate ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='endDate'
        >
          <span className={errors?.endDate && touched?.endDate ? 'fw-bolder me-1' : null}> End Date </span>
          <ErrorMessage name='endDate' />
        </label>
        <Field
          type='date'
          id='endDate'
          name='endDate'
          placeholder='Enter your degree'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Github Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.github && touched?.github ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='github'
        >
          <span className={errors?.github && touched?.github ? 'fw-bolder me-1' : null}> Github </span>
          <ErrorMessage name='github' />
        </label>
        <Field
          type='text'
          id='github'
          name='github'
          placeholder='Link to your github'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* LinkedIn Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.linkedIn && touched?.linkedIn ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='linkedIn'
        >
          <span className={errors?.linkedIn && touched?.linkedIn ? 'fw-bolder me-1' : null}> LinkedIn </span>
          <ErrorMessage name='linkedIn' />
        </label>
        <Field
          type='text'
          id='linkedIn'
          name='linkedIn'
          placeholder='Link to your linkedIn'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Personal Website Field */}
      <div className='form-group col-12'>
        <label
          className={errors?.personalSite && touched?.personalSite ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='personalSite'
        >
          <span className={errors?.personalSite && touched?.personalSite ? 'fw-bolder me-1' : null}>
            Personal Website 
          </span>
          <ErrorMessage name='personalSite' />
        </label>
        <Field
          type='text'
          id='personalSite'
          name='personalSite'
          placeholder='Link to your personal website'
          className='form-control mb-4 px-3'
          autoComplete='on'
          disabled={!isEditable}
        />
      </div>

      {/* Make Account Visible Checkbox */}
      <div className='form-group col-12 ms-2'>
        <Field
          type='checkbox'
          id='employerVisible'
          name='employerVisible'
          className='form-check-input'
          autoComplete='on'
          disabled={!isEditable}
        />
        <label
          className={errors?.employerVisible && touched?.employerVisible ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='employerVisible'
        >
          <span className={errors?.employerVisible && touched?.employerVisible ? 'fw-bolder me-1' : null}>
            Make my account visible to employers
          </span>
          <ErrorMessage name='employerVisible' />
        </label>
      </div>

      {/* Receive Notification Checkbox */}
      <div className='form-group col-12 ms-2'>
        <Field
          type='checkbox'
          id='getNotifications'
          name='getNotifications'
          className='form-check-input'
          autoComplete='on'
          disabled={!isEditable}
        />
        <label
          className={errors?.getNotifications && touched?.getNotifications ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'}
          htmlFor='getNotifications'
        >
          <span className={errors?.getNotifications && touched?.getNotifications ? 'fw-bolder me-1' : null}>
            Receive Notification
          </span>
          <ErrorMessage name='getNotifications' />
        </label>
      </div>
    </Form>
  );
}
