import * as yup from "yup"
import { passwordReg } from "../constants/regex"


export const signUpSchema = yup.object().shape({
    name:yup.string().required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    phone:yup.string().required("Required"),
    address:yup.string().required("Required"),
    location:yup.string().required("Required"),
    password:yup.string().min(5).matches(passwordReg, {message:"Please create a stronger password"}).required("Required"),
    confirm:yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Required")
})

export const loginSchema = yup.object().shape({
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:yup.string().min(5).required("Required")
})
