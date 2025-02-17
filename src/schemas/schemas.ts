import * as yup from "yup";
import { passwordReg } from "../constants/regex";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  phone: yup.string().required("Required"),
  address: yup.string().required("Required"),
  location: yup.string().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordReg, { message: "Please create a stronger password" })
    .required("Required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
});

export const phoneDetailsSchema = yup.object().shape({
  camera: yup.string().required("Required"),
  display_res: yup.string().required("Required"),
  display_size: yup.string().required("Required"),
  ram: yup.string().required("Required"),
  storage: yup.string().required("Required"),
  battery: yup.string().required("Required"),
  os_type: yup.string().required("Required"),
  network: yup.string().required("Required"),
  processor: yup.string().required("Required"),
  description: yup
    .string()
    .required("Required")
    .min(10, "Description must be at least 10 characters long")
    .trim(),
  release_date: yup.string().required("Required"),
  body: yup.string().required("Required"),
  price: yup
    .number()
    .typeError("Please enter a valid price")
    .required("Required")
    .positive("Price must be a positive number"),
  stock: yup
    .number()
    .typeError("Please enter a valid stock")
    .positive("Stock must be a positive number")
    .required("Required"),
  condition: yup.string().required("Required"),
});
