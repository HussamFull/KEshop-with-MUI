import * as yup from 'yup';

const registerSchema = yup.object({
  fullName: yup.string().required('Full Name is required').min(3, 'Full Name must be at least 3 characters').max(20,"max length is 30"),
  userName: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  password: yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
  phoneNumber: yup.string().required('Phone Number is required').min(3, 'Phone Number must be at least 3 characters'),
  email: yup.string().required('Email is required').min(3, 'Email must be at least 3 characters'),
});

export default registerSchema;