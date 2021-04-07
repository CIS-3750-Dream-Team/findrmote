import * as yup from 'yup';

const emailValidation = yup.string().email('enter a valid email').required('(required)');
const firstNameValidation = yup
  .string()
  .required('(required)')
  .min(2, '(must be ateast 2 character)');
const lastNameValidation = yup
  .string()
  .required('(required)')
  .min(2, '(must be ateast 2 character)');
const urlValidation = yup.string().trim().notRequired().url('(must be a valid url)');
const normalValidation = yup.string().trim().notRequired();

// validation schema for login page
export const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: yup
    .string()
    .required('(required)')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      '(must be minimum 8 characters, at least 1 letter and 1 number)'
    ),
});

export const profileValidationCandidateSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
  github: urlValidation,
  education: normalValidation,
  degree: normalValidation,
  github: urlValidation,
  linkedIn: urlValidation,
  personalSite: urlValidation,
  getNotifications: yup.boolean(),
  employerVisible: yup.boolean(),
  startDate: yup.date().notRequired(),
  endDate: yup.date().notRequired().when('startDate', (startDate, schema) => (startDate && schema.min(startDate, '(cannot be smaller than start date)')))
});

export const profileValidationEmployerSchema = yup.object().shape({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  email: emailValidation,
});

export const zeroValidationSchema = yup.object().shape({});

export const companyTabValidationSchema = yup.object().shape({
  companyName: yup.string().trim().required('(required)'),
  location: yup.string().trim().required('(required)'),
  site: urlValidation,
  companyEmail: yup.string().trim().email('(enter a valid email)').required('(required)'),
  companyPhone: yup.string().trim().required('(required)'),
  companyDescription: yup.string().trim().required('(required)'),
});
