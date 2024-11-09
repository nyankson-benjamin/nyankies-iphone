import { FC } from "react";
import { cn } from "../utils/cn";

interface UploadButtonProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  
}
export const UploadButton: FC<UploadButtonProps> = ({ handleFileChange, children, className, disabled }) => {

  return <div className="flex items-center gap-2 flex-col md:flex-row lg:flex-row">
  
  <div>
    <input
      type="file"
      onChange={handleFileChange}
        id="file-input"
        className="hidden"

      />
      <label
        htmlFor={disabled ? "disabled" : "file-input"}
        className={cn(
          "cursor-pointer  p-2 flex items-center gap-2 border border-primaryViolet rounded-lg",
          className,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* <svg
        width="21"
        height="19"
        viewBox="0 0 21 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 15C11.75 15 12.8125 14.5625 13.6875 13.6875C14.5625 12.8125 15 11.75 15 10.5C15 9.25 14.5625 8.1875 13.6875 7.3125C12.8125 6.4375 11.75 6 10.5 6C9.25 6 8.1875 6.4375 7.3125 7.3125C6.4375 8.1875 6 9.25 6 10.5C6 11.75 6.4375 12.8125 7.3125 13.6875C8.1875 14.5625 9.25 15 10.5 15ZM10.5 13C9.8 13 9.20833 12.7583 8.725 12.275C8.24167 11.7917 8 11.2 8 10.5C8 9.8 8.24167 9.20833 8.725 8.725C9.20833 8.24167 9.8 8 10.5 8C11.2 8 11.7917 8.24167 12.275 8.725C12.7583 9.20833 13 9.8 13 10.5C13 11.2 12.7583 11.7917 12.275 12.275C11.7917 12.7583 11.2 13 10.5 13ZM2.5 18.5C1.95 18.5 1.47917 18.3042 1.0875 17.9125C0.695833 17.5208 0.5 17.05 0.5 16.5V4.5C0.5 3.95 0.695833 3.47917 1.0875 3.0875C1.47917 2.69583 1.95 2.5 2.5 2.5H5.65L7.5 0.5H13.5L15.35 2.5H18.5C19.05 2.5 19.5208 2.69583 19.9125 3.0875C20.3042 3.47917 20.5 3.95 20.5 4.5V16.5C20.5 17.05 20.3042 17.5208 19.9125 17.9125C19.5208 18.3042 19.05 18.5 18.5 18.5H2.5ZM2.5 16.5H18.5V4.5H14.45L12.625 2.5H8.375L6.55 4.5H2.5V16.5Z"
          fill="#6539C3"
        />
      </svg>
      Upload */}
      {children}
    </label>
  </div>
</div>;
};
