import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import { UploadButton } from "../UploadButton";
import useFileUpload from "../../hooks/useFileUpload";
import Modal from "../modals/Modal";
import Cloude from "../../assets/icons/Cloude";
import CloseIcon from "../../assets/icons/CloseIcon";
import { Button } from "../ui/Button";
import useMutation from "../../hooks/useMutation";
import { useAlert } from "../../hooks/useAlert";

const DropdownButton = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`text-lg whitespace-nowrap text-primaryDeep cursor-pointer px-4 py-2 hover:bg-gray-100 w-full text-left ${className}`}
    >
      {children}
    </button>
  );
};
export default function UserDropdown() {
  const { logout, user, updateProfileImage } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { handleFileChange, preview } = useFileUpload();
  const [openModal, setOpenModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const width = useScreenWidth();
  const { fetchData, isLoading } = useMutation();
  const { showAlert } = useAlert();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const callback = () => {
    setOpenModal(false);
  };

  const handleSavePic = async () => {
    const data = await fetchData<{
      message: string;
      image: { id: string; image: string; public_id: string };
    }>(
      "auth/update_profile_mage",
      "post",
      {
        userId: user?._id as string,
        image: preview as string,
      },
      callback
    );
    if (data?.image?.image) {
      updateProfileImage(data?.image?.image);
      showAlert(data?.message, "success");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex items-center justify-between pb-2">
          <p className="font-bold">Update Profile Image</p>
          <CloseIcon onClick={() => setOpenModal(false)} />
        </div>
        <div>
          <UploadButton
            className="border-none"
            handleFileChange={handleFileChange}
          >
            {preview ? (
              <div>
                <img src={preview ?? user?.profile_image} alt="" className="w-52 h-52" />
                <p>Click to select a new image</p>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col">
                <Cloude />{" "}
                <div className="text-center">
                  Click here to upload new image
                </div>
              </div>
            )}
          </UploadButton>
        </div>
        <div className="flex justify-end items-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => setOpenModal(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={() => handleSavePic()}
            disabled={!preview}
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </Modal>
      <div className="flex items-center gap-2">
        {width > 768 && <p className="text-sm"> {user?.email} </p>}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="shadow-md rounded-full"
        >
          {user?.profile_image ? (
            <img src={user?.profile_image} alt="" className="size-10 rounded-full" />
          ) : (
            <ProfileIcon />
          )}
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white shadow-md mt-2 rounded right-0 ">
          <DropdownButton
            onClick={() => {
              setOpenModal(true);
              setIsDropdownOpen(false);
            }}
          >
            Change profile
          </DropdownButton>
          <DropdownButton
            onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}
          >
            Logout
          </DropdownButton>
        </div>
      )}
    </div>
  );
}
