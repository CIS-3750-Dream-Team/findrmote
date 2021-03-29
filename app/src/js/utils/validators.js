import * as yup from 'yup';

// validation schema for login page
export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('enter a valid email').required('(required)'),
  password: yup
    .string()
    .required('(required)')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      '(must be minimum 8 characters, at least 1 letter and 1 number)'
    ),
});
