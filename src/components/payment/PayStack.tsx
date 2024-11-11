import { PaystackButton } from "react-paystack";
import { useAuthStore } from "../../store/AuthStore";
import { useScreenWidth } from "../../hooks/useScreenWidth";

function Paystack({ amount, handlePurchase, loading, disabled, email }: Readonly<{ amount: number, handlePurchase: () => void, loading: boolean, disabled: boolean, email: string }>) {
  const { user } = useAuthStore();
  const width = useScreenWidth();

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email || email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: "GHS",
  };

  const handlePaystackSuccessAction = (reference: { reference: string }) => {
    console.log(reference);
    handlePurchase();
  };

  const handlePaystackCloseAction = () => {
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: loading ? "Loading..." : (width < 400 ? `Checkout` : `Proceed to Checkout (GHS ${amount})`),
    onSuccess: (reference: { reference: string }) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <PaystackButton
      {...componentProps}
      className={
        ["flex items-center w-full justify-center p-2 rounded-lg text-[white] hover:shadow-md ", disabled ? 'bg-[#d2d2d2]':'bg-primary hover:bg-primaryDeep'].join(' ')
      }
      disabled={disabled}
    />
  );
}

export default Paystack;
