import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import ResponsiveContainer from "../ResponsiveContainer";
export default function NavBarLinks({
  links,
  showLogout = true,
}: {
  links: { name: string; path: string }[];
  showLogout?: boolean;
}) {
  const location = useLocation();

  const { logout, isAuthenticated } = useAuthStore();
  return (
    <ResponsiveContainer>
      <ul className="flex gap-5 items-center">
        {links.map((link) => (
          <li key={link.path} className="text-lg text-primaryDeep ">
            <Link
              to={link.path}
              className={location.pathname === link.path ? "font-bold" : " "}
            >
              {link.name}
            </Link>
          </li>
        ))}
        {showLogout && isAuthenticated && (
          <li
            className="text-lg text-primaryDeep cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </li>
        )}
      </ul>
    </ResponsiveContainer>
  );
}
