import { Button } from "../../components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/axiosInstance";
import { useAlert } from "../../hooks/useAlert";
export default function Confirmation() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  console.log(token);
  const confirm = async () => {
    try {
      const res = await API.get<{ message: string }>(`/api/auth/confirm/${token}`);
      showAlert(res?.data?.message || "Operation successful!", "success");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error:any) {
      console.log(error);
      showAlert(error?.response?.data?.message || "Operation failed!", "error");
    }
  };
  return (
    <div className="flex flex-col gap-5 w-56 sm:w-96 md:w-fit lg:w-96 xl:w-96 2xl:w-96 items-center justify-center min-h-screen mx-auto ">
      <div className="flex flex-col gap-5 items-center justify-center border border-gray-200 rounded-lg p-5">
        <h1 className="text-2xl font-bold text-primary">Confirmation</h1>
        <p className="text-sm text-gray-500">
          Click on the button below to confirm your email
        </p>
        <Button onClick={confirm}>Confirm</Button>
      </div>
    </div>
  );
}
