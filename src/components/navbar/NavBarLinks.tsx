import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ResponsiveContainer from "../ResponsiveContainer";
// import CategoriesDropDown from "./CategoriesDropDown";
export default function NavBarLinks({
  links,
}: {
  links: { name: string; path: string }[];
  showLogout?: boolean;
  showCategories?: boolean;
  showProfile?: boolean;
}) {
  const location = useLocation();

  return (
    <ResponsiveContainer>
      <div className="flex gap-5 items-center">
        {/* <CategoriesDropDown /> */}
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

          {/* {showProfile && <UserDropdown showLogout={showLogout} />} */}
        </ul>
      </div>
    </ResponsiveContainer>
  );
}
