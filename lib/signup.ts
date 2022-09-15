import * as Yup from "yup";

export const signupValidationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(6, "Should be more than 6 characters")
    .max(240, "Should be less than 240 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Should be more than 3 characters")
    .max(120, "Should be less than 120 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Should be more than 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
