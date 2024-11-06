import AuthLayout from "../../layout/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import API from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
export default function ResetPassword() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await API.post<{ message: string }>(
          `/api/auth/recover`,
          values
        );
        showAlert(
          response?.data?.message || "Operation successful!",
          "success"
        );
        setTimeout(() => {
          navigate("/signup-successfull?recover=true");
        }, 500);
      } catch (error:any) {
        console.log(error);
        showAlert(
          error?.response?.data?.message || "Operation failed!",
          "error"
        );
      }
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    }),
  });
  return (
    <AuthLayout text="Reset Password">
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
      >
        <Input
          type="email"
          placeholder="Email"
          label="Email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email ? formik.errors.email : undefined}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Reset Password
        </Button>

        <p className="text-sm text-center text-primaryDeep">
          Forgot password? <Link to="/reset-password">Reset here</Link>
        </p>
        <p className="text-sm text-center text-primaryDeep">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
