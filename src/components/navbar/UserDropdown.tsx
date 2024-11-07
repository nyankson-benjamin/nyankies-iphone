import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useScreenWidth } from "../../hooks/useScreenWidth";
export default function UserDropdown() {
  const { logout, user } = useAuthStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const width = useScreenWidth();
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
       {width > 768 && <p className="text-sm"> {user?.email} </p>}
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="text-lg text-primaryDeep flex items-center gap-1 shadow-sm px-2 py-1 rounded-md hover:bg-gray-100"
      >
        <ProfileIcon />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute bg-white shadow-md mt-2 rounded right-0 ">
          
            <li
              className="text-lg text-primaryDeep cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                logout();
                setDropdownOpen(false);
              }}
            >
              Logout
            </li>
        
        </div>
      )}
    </div>
  );
}
