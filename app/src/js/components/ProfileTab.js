import * as React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import {
  profileValidationCandidateSchema,
  profileValidationEmployerSchema,
  zeroValidationSchema,
} from '../utils/validators';

import '../../scss/profile-tab.scss';
import '../../scss/error.scss';

const { useEffect } = React;

/**
 * @see - https://formik.org/docs/api/useFormikContext
 * @param {Object} props  
 * @returns - A helper React component that uses React Context to grab all the form values of Formik and trigger form submission manually
 */
function SubmitFormOnSave({ isSaved, setSaved, setEditable, session }) {
  const {
    submitForm,
    isSubmitting,
    validateForm,
    setErrors,
    setTouched,
  } = useFormikContext();

  useEffect(async () => {
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
  }, [isSaved]);

  return null;
}

/**
 * @param {string} session - The user session - candidate or employer
 * @returns - an object with all the form fields set to true
 */
function touchAllFields(session) {
  let touched = {
    firstName: true,
    lastName: true,
    email: true,
  };

  if (session === 'candidate') {
    touched = {
      ...touched,
      github: true,
      linkedIn: true,
      personalSite: true,
      receiveNotification: true,
      makeVisibleEmployers: true,
      startDate: true,
      endDate: true,
    };

    return touched;
  }

  return touched;
}

/**
 * Function that sets up the initial values for form population and the validation schema
 * @param {string} session - Candidate or Employer
 * @param {Object} profileInformation - Pofile information about the user
 * @returns a tuple of the initial form values and the validation schema based on the session
 */
function getInitialFormValuesAndValidationSchema(session, profileInformation) {
  const {
    firstName,
    lastName,
    email,
    github,
    linkedIn,
    personalSite,
    receiveNotification,
    makeVisibleEmployers,
    startDate,
    endDate,
  } = profileInformation;

  let initialFormValues = {};
  let validationSchema = zeroValidationSchema;

  if (session === 'candidate') {
    // set initial values for candidate
    initialFormValues = {
      firstName: firstName != null ? firstName : '',
      lastName: lastName != null ? lastName : '',
      email: email != null ? email : '',
      github: github != null ? github : '',
      linkedIn: linkedIn != null ? linkedIn : '',
      personalSite: personalSite != null ? personalSite : '',
      receiveNotification: receiveNotification != null ? receiveNotification : false,
      makeVisibleEmployers: makeVisibleEmployers != null ? makeVisibleEmployers : false,
      startDate: startDate != null ? startDate : '',
      endDate: endDate != null ? endDate : '',
    };

    // set validation for candidate
    validationSchema = profileValidationCandidateSchema;
  } else if (session === 'employer') {
    // set initial values for employer
    initialFormValues = {
      firstName: firstName != null ? firstName : '',
      lastName: lastName != null ? lastName : '',
      email: email != null ? email : '',
    };

    // set validation for employer
    validationSchema = profileValidationEmployerSchema;
  }

  return [initialFormValues, validationSchema];
}

/**
 * @param {Object} props
 * @returns - The React Component that displays the Profile Form
 */
export default function ProfileTab({
  session,
  isEditable,
  profileInformation,
  isSaved,
  setSaved,
  setEditable,
}) {
  const [initialFormValues, validationSchema] = getInitialFormValuesAndValidationSchema(
    session,
    profileInformation
  );
  return (
    <div className='my-1 px-2 justify-content-between profile-tab'>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={async (values) => console.log('submit', values)} // form submission handler - connect with the backend here
      >
        {(formikProps) => {
          const props = {
            ...formikProps,
            isEditable,
          };

          return (
            <div>
              <ProfileCommon {...props} />
              <div className='mb-3 mt-1 profile-tab--border-bottom'></div>
              {session === 'candidate' ? <ProfileCandidateOptional {...props} /> : null}
              
              {/* A React Component that handles the form submission trigger */}
              <SubmitFormOnSave
                isSaved={isSaved}
                setSaved={setSaved}
                setEditable={setEditable}
                session={session}
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
          className={
            errors?.firstName && touched?.firstName
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='firstName'
        >
          <span className={errors?.firstName && touched?.firstName ? 'fw-bolder' : null}>
            First Name
          </span>{' '}
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
          className={
            errors?.lastName && touched?.lastName ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='lastName'
        >
          <span className={errors?.lastName && touched?.lastName ? 'fw-bolder' : null}>
            Last Name
          </span>{' '}
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
          className={
            errors?.email && touched?.email ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='email'
        >
          <span className={errors?.email && touched?.email ? 'fw-bolder' : null}>
            Email
          </span>{' '}
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
          className={
            errors?.education && touched?.education
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='education'
        >
          <span className={errors?.education && touched?.education ? 'fw-bolder' : null}>
            Education
          </span>{' '}
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
          className={
            errors?.degree && touched?.degree ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='degree'
        >
          <span className={errors?.degree && touched?.degree ? 'fw-bolder' : null}>
            Degree
          </span>{' '}
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
          className={
            errors?.startDate && touched?.startDate
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='startDate'
        >
          <span className={errors?.startDate && touched?.startDate ? 'fw-bolder' : null}>
            Start Date
          </span>{' '}
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
          className={
            errors?.endDate && touched?.endDate ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='endDate'
        >
          <span className={errors?.endDate && touched?.endDate ? 'fw-bolder' : null}>
            End Date
          </span>{' '}
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
          className={
            errors?.github && touched?.github ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='github'
        >
          <span className={errors?.github && touched?.github ? 'fw-bolder' : null}>
            Github
          </span>{' '}
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
          className={
            errors?.linkedIn && touched?.linkedIn ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
          }
          htmlFor='linkedIn'
        >
          <span className={errors?.linkedIn && touched?.linkedIn ? 'fw-bolder' : null}>
            LinkedIn
          </span>{' '}
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
          className={
            errors?.personalSite && touched?.personalSite
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='personalSite'
        >
          <span
            className={errors?.personalSite && touched?.personalSite ? 'fw-bolder' : null}
          >
            Personal Website
          </span>{' '}
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
      <div className='form-group col-12'>
        <Field
          type='checkbox'
          id='makeVisibleEmployers'
          name='makeVisibleEmployers'
          className='form-check-input'
          autoComplete='on'
          disabled={!isEditable}
        />
        <label
          className={
            errors?.makeVisibleEmployers && touched?.makeVisibleEmployers
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='makeVisibleEmployers'
        >
          <span
            className={
              errors?.makeVisibleEmployers && touched?.makeVisibleEmployers
                ? 'fw-bolder'
                : null
            }
          >
            Make my account visible to employers
          </span>{' '}
          <ErrorMessage name='makeVisibleEmployers' />
        </label>
      </div>

      {/* Receive Notification Checkbox */}
      <div className='form-group col-12'>
        <Field
          type='checkbox'
          id='receiveNotification'
          name='receiveNotification'
          className='form-check-input'
          autoComplete='on'
          disabled={!isEditable}
        />
        <label
          className={
            errors?.receiveNotification && touched?.receiveNotification
              ? 'error ms-2 mb-1'
              : 'txt-0 ms-2 mb-1'
          }
          htmlFor='receiveNotification'
        >
          <span
            className={
              errors?.receiveNotification && touched?.receiveNotification
                ? 'fw-bolder'
                : null
            }
          >
            Receive Notification
          </span>{' '}
          <ErrorMessage name='receiveNotification' />
        </label>
      </div>
    </Form>
  );
}
