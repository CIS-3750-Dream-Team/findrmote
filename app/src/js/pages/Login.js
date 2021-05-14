import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';

import { Session } from '../utils/contexts';
import { loginValidationSchema } from '../utils/validators';

import '../../scss/error.scss';
import '../../scss/login.scss';


/**
 * @description The Login Page that lets the user login using their email and password
 * @param {Object} props The properties sent to the component
 * @returns {ReactElement} The Login Page React Element.
 */
export default function Login(props) {
  const session = useContext(Session);
  const history = useHistory();

  // handle form submission
  const handleSubmit = async (values) => {
    // Make POST request with fields
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        // Display a notification
        if (res.success) {
          session.setID(res.data.user_id);
          session.setType(res.data.type);
          // Redirect to Home page
          history.push('/');
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        // Display an error popup
        console.error(err);
      });
  };

  return (
    <div className='row align-items-center my-5 login'>
      <div className='col-12 col-lg-5 offset-lg-3'>
        <h1 className='fw-bold mb-4'>Sign in</h1>
        <div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={loginValidationSchema}
            validateOnBlur
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                {/* Email Field */}
                <div className='form-group'>
                  <label
                    className={
                      errors.email && touched.email
                        ? 'error ms-2 mb-1'
                        : 'txt-0 ms-2 mb-1'
                    }
                    htmlFor='email'
                  >
                    <span className={errors.email && touched.email ? 'fw-bolder' : ''}>
                      Email
                    </span>{' '}
                    <ErrorMessage name='email' />
                  </label>
                  <Field
                    type='email'
                    id='email'
                    name='email'
                    placeholder='jane@doe.com'
                    className='form-control form-control-lg mb-4 px-3'
                  />
                </div>
                {/* Password Field */}
                <div className='form-group'>
                  <label
                    className={
                      errors.password && touched.password
                        ? 'error ms-2 mb-1'
                        : 'txt-0 ms-2 mb-1'
                    }
                    htmlFor='password'
                  >
                    <span
                      className={errors.password && touched.password ? 'fw-bolder' : ''}
                    >
                      Password
                    </span>{' '}
                    <ErrorMessage name='password' />
                  </label>
                  <Field
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Your password goes here'
                    className='form-control form-control-lg mb-4 px-3'
                    autoComplete='on'
                  />
                </div>
                <button
                  className='btn btn-primary mt-3 w-100'
                  disabled={isSubmitting}
                  type='submit'
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>

          <div className='text-center my-4'>
            <p className='login--register'>
              Don't have an account? <a href='/register'>Sign up</a>
            </p>

            {/* TODO: forget password route needs to be added. Currently takes you to the home page*/}
            <a className='login--forgotpasword' href='/'>
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
