import { useSearchParams } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";

export default function AfterSignUp() {
  const [searchParams] = useSearchParams();
  const isRecover = searchParams.get("recover") === "true";

  if (isRecover) {
    return (
      <AuthLayout text="Password Recovery">
        <div className="flex flex-col items-center justify-center h-full text-primary">
          <p className="text-sm text-gray-500">
            A password recovery link has been sent to your email. Kindly check
            your email and reset your password.
          </p>
        </div>
      </AuthLayout>
    );
  }
  return (
    <div>
      <AuthLayout text="thank you for signing up">
        <div className="flex flex-col items-center justify-center h-full text-primary">
          <h1 className="text-2xl font-bold pb-4">Welcome to our platform!</h1>
          <p className="text-sm text-gray-500">
            Your account has been created successfully. Please check your email
            for verification. 
          </p>
        </div>
      </AuthLayout>
    </div>
  );
}
