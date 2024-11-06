import { useFormik } from "formik";
import { useAlert } from "../useAlert";
import { signUpSchema } from "../../schemas/schemas";
import API from "../../services/axiosInstance";
import {  useNavigate } from "react-router-dom";
export const useRegister = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        name: "",
        phone: "",
        address: "",
        password: "",
        location: "",
        confirm: "",
      },
      onSubmit: async (values, actions) => {
        if (formik.isValid) {
          actions.setSubmitting(true);
          try {
            actions.setSubmitting(true);
            const res = await API.post("/api/auth/signup", values);
            showAlert(res?.data?.message || "Operation successful!", "success");
            setTimeout(() => {
                navigate("/signup-successfull?recover=false");
            }, 500);
          } catch (error) {
            showAlert(error?.response?.data?.message || "Something went wrong!", "error");
            actions.setSubmitting(false);
          } finally {
            actions.setSubmitting(false);
          }
        } else {
          console.log("Form is not valid");
          actions.setSubmitting(false);
        }
      },
  
      validationSchema: signUpSchema,
    });

    return { formik };
}   