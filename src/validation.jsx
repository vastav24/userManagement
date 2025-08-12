import * as Yup from "yup";

export const phoneRegExp =
  /^(\+)?((\+[1-9]{1,4}[ -]*)|(\([0-9]{2,3}\)[ -]*)|([0-9]{2,4})[ -]*)*?[0-9]{3,4}?[ -]*[0-9]{3,4}?$/;

export const validationSchema = () => {
  return Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username must be alphanumeric or contain underscores"
      )
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    address: Yup.string()
      .min(5, "Address must be at least 5 characters")
      .required("Address is required"),

    phone: Yup.string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(6, "Too short")
      .max(20, "Too long"),

    website: Yup.string()
      .url("Website must be a valid URL")
      .required("Website is required"),

    company: Yup.string()
      .min(2, "Company name must be at least 2 characters")
      .required("Company is required"),
  });
};
