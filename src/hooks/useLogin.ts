import { useFormik } from "formik";
import { loginSchema } from "../schemas/schemas";
import { useAlert } from "./useAlert";
import API from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { decodeToken, setToken } from "../services/auth";
import { useAuthStore, User } from "../store/AuthStore";
interface LoginValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { showAlert } = useAlert();
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values: LoginValues) => {
      try {
        const response = await API.post<{
          user: User;
          token: string;
          message: string;
        }>("/api/auth/login", values);
        showAlert(
          response?.data?.message || "Operation successful!",
          "success"
        );
        setToken(response?.data?.token);
        setUser(decodeToken());
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } catch (error) {
        const err = error as { response: { data: { message: string } } };
        showAlert(
          err?.response?.data?.message || "Something went wrong!",
          "error"
        );
      }
    },
  });

  return { formik };
};
