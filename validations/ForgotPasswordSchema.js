import * as yup from 'yup';


// تعريف مخطط التحقق (Validation Schema) باستخدام Yup
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email ")
    .required("Email required "),
});

export default forgotPasswordSchema;