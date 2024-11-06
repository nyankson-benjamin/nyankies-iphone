import AuthLayout from "../../layout/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import API from "../../services/axiosInstance";
import { useAlert } from "../../hooks/useAlert";
import { passwordReg } from "../../constants/regex";
export default function ResetPassword() {
  const { token } = useParams();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await API.post<{ message: string }>(
          `/api/auth/reset`,
          {
            newPassword: values.password,
            token: token,
          }
        );
        showAlert(
          response?.data?.message || "Operation successful!",
          "success"
        );
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error:any) {
        showAlert(
          error?.response?.data?.message || "Operation failed!",
          "error"
        );
      }
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(8)
        .matches(
          passwordReg,
          {
            message:
              "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
          }
        )
        .required("Required"),
      confirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
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
          type="password"
          placeholder="Password"
          label="Password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          {...formik.getFieldProps("confirm")}
          error={formik.touched.confirm ? formik.errors.confirm : undefined}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
