import AuthLayout from "../../layout/AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
export default function Login() {
  const { formik } = useLogin();
  return (
    <AuthLayout text="Login">
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
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Login
        </Button>

        <p className="text-sm text-center text-primaryDeep">
          Forgot password? <Link to="/forgot-password">Reset here</Link>
        </p>
        <p className="text-sm text-center text-primaryDeep">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
