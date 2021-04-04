import * as React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import {
  profileValidationCandidateSchema,
  profileValidationEmployerSchema,
  zeroValidationSchema,
} from '../utils/validators';

import '../../scss/profile-tab.scss';
import '../../scss/error.scss';

const { useEffect, useState } = React;

function SubmitFormOnSave({ isSaved }) {
  const { isValid, submitForm, isSubmitting } = useFormikContext();

  useEffect(async () => {
    // if form is not valid return
    if (!isValid) {
      return;
    }

    if (isSaved && !isSubmitting) {
      try {
        await submitForm();
      } catch (e) {
        console.log(e);
      }
    }
  }, [isSaved]);

  return null;
}

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

export default function ProfileTab({ session, isEditable, profileInformation, isSaved }) {
  const [initialFormValues, validationSchema] = getInitialFormValuesAndValidationSchema(
    session,
    profileInformation
  );

  const [click, setClick] = useState(false);

  return (
    <div className='my-1 px-2 justify-content-between profile-tab'>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={async (values) => console.log('submit', values)} // form submission handler
      >
        {(formikProps) => {
          const props = {
            ...formikProps,
            isEditable,
          };

          return (
            <div>
              <ProfileCommon {...props} />
              {session === 'candidate' ? <ProfileCandidateOptional {...props} /> : null}
              <SubmitFormOnSave isSaved={click} />
            </div>
          );
        }}
      </Formik>
      <button onClick={() => setClick(!click)}>Click me</button>
    </div>
  );
}

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

function ProfileCandidateOptional({ errors, touched, isEditable }) {
  return (
    <Form className='row'>
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
