import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("البريد الإلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
});

export default forgotPasswordSchema;