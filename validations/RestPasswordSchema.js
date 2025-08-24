import * as yup from 'yup';


// تعريف مخطط التحقق (Validation Schema) باستخدام Yup
const RestPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
//  confirmPassword: yup
   // .string()
    //.oneOf([yup.ref("newPassword"), null], "Passwords must match")
    //.required("Confirm Password is required"),
  code: yup
    .string()
    .required("Verification code is required")
    .length(4, "The code must be 4 digits"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});


export default RestPasswordSchema;