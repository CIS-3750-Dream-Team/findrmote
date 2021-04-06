import * as React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import { companyTabValidationSchema } from '../utils/validators';
import { touchAllFields } from '../utils/form-helpers';

import '../../scss/error.scss';

const { useEffect } = React;

/**
 * @param {Object} props
 * @returns - The React Component that displays the Company Tab
 */
export default function CompanyTab({
  isEditable,
  companyInformation,
  isSaved,
  setSaved,
  setEditable,
}) {
  const {
    companyName,
    location,
    site,
    companyEmail,
    companyPhone,
    companyDescription,
  } = companyInformation;

  const initialValues = {
    companyName: companyName ?? '',
    location: location ?? '',
    site: site ?? '',
    companyEmail: companyEmail ?? '',
    companyPhone: companyPhone ?? '',
    companyDescription: companyDescription ?? '',
  };

  return (
    <div className='my-1 px-2 justify-content-between profile-tab'>
      <Formik
        initialValues={initialValues}
        validationSchema={companyTabValidationSchema}
        validateOnBlur
        onSubmit={async (values) => console.log('company', values)}
      >
        {({ errors, touched }) => (
          <Form className='row'>
            {/* First Name Field */}
            <div className='form-group col-12 col-md-6'>
              <label
                className={
                  errors?.companyName && touched?.companyName
                    ? 'error ms-2 mb-1'
                    : 'txt-0 ms-2 mb-1'
                }
                htmlFor='companyName'
              >
                <span
                  className={
                    errors?.companyName && touched?.companyName ? 'fw-bolder' : null
                  }
                >
                  Company Name
                </span>{' '}
                <ErrorMessage name='companyName' />
              </label>
              <Field
                type='text'
                id='companyName'
                name='companyName'
                placeholder='Enter company name'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>

            {/* Location Field */}
            <div className='form-group col-12 col-md-6'>
              <label
                className={
                  errors?.location && touched?.location
                    ? 'error ms-2 mb-1'
                    : 'txt-0 ms-2 mb-1'
                }
                htmlFor='location'
              >
                <span
                  className={errors?.location && touched?.location ? 'fw-bolder' : null}
                >
                  Location
                </span>{' '}
                <ErrorMessage name='location' />
              </label>
              <Field
                type='text'
                id='location'
                name='location'
                placeholder='Enter location'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>

            {/* Company website Field */}
            <div className='form-group col-12'>
              <label
                className={
                  errors?.site && touched?.site ? 'error ms-2 mb-1' : 'txt-0 ms-2 mb-1'
                }
                htmlFor='site'
              >
                <span className={errors?.site && touched?.site ? 'fw-bolder' : null}>
                  Company website
                </span>{' '}
                <ErrorMessage name='site' />
              </label>
              <Field
                type='text'
                id='site'
                name='site'
                placeholder='http://example.com'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>

            {/* Company Email Field */}
            <div className='form-group col-12 col-md-6'>
              <label
                className={
                  errors?.companyEmail && touched?.companyEmail
                    ? 'error ms-2 mb-1'
                    : 'txt-0 ms-2 mb-1'
                }
                htmlFor='companyEmail'
              >
                <span
                  className={
                    errors?.companyEmail && touched?.companyEmail ? 'fw-bolder' : null
                  }
                >
                  Company email
                </span>{' '}
                <ErrorMessage name='companyEmail' />
              </label>
              <Field
                type='email'
                id='companyEmail'
                name='companyEmail'
                placeholder='Enter company email'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>

            {/* Phone number Field */}
            <div className='form-group col-12 col-md-6'>
              <label
                className={
                  errors?.companyPhone && touched?.companyPhone
                    ? 'error ms-2 mb-1'
                    : 'txt-0 ms-2 mb-1'
                }
                htmlFor='companyPhone'
              >
                <span
                  className={
                    errors?.companyPhone && touched?.companyPhone ? 'fw-bolder' : null
                  }
                >
                  Phone number
                </span>{' '}
                <ErrorMessage name='companyPhone' />
              </label>
              <Field
                type='text'
                id='companyPhone'
                name='companyPhone'
                placeholder='Enter phone number'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>

            {/* Company Description Field */}
            <div className='form-group col-12 col-md-6'>
              <label
                className={
                  errors?.companyDescription && touched?.companyDescription
                    ? 'error ms-2 mb-1'
                    : 'txt-0 ms-2 mb-1'
                }
                htmlFor='companyDescription'
              >
                <span
                  className={
                    errors?.companyDescription && touched?.companyDescription
                      ? 'fw-bolder'
                      : null
                  }
                >
                  Company Description
                </span>{' '}
                <ErrorMessage name='companyDescription' />
              </label>
              <Field
                as='textarea'
                id='companyDescription'
                name='companyDescription'
                placeholder='Enter company description'
                className='form-control mb-4 px-3'
                autoComplete='on'
                disabled={!isEditable}
              />
            </div>
            {/* A React Component that handles the form submission trigger */}
            <SubmitFormOnSave
              isSaved={isSaved}
              setSaved={setSaved}
              setEditable={setEditable}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

/**
 * @see - https://formik.org/docs/api/useFormikContext
 * @param {Object} props
 * @returns - A helper React component that uses React Context to grab all the form values of Formik and trigger form submission manually
 */
function SubmitFormOnSave({ isSaved, setSaved, setEditable }) {
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

        setTouched({
          ...touchAllFields(
            'companyName',
            'location',
            'site',
            'companyEmail',
            'companyPhone',
            'companyDescription'
          ),
        });
        setErrors({ ...errors });
        setSaved(false);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isSaved]);

  return null;
}
