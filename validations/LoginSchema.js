import * as yup from 'yup';

const loginSchema = yup.object({
  password: yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
  email: yup.string().required('Email is required').min(3, 'Email must be at least 3 characters'),
});

export default loginSchema;