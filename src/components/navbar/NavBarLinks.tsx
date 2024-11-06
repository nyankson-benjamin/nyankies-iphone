import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function NavBarLinks({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  const location = useLocation();
  return (
    <div className="hidden md:block lg:block xl:block" >
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
      </ul>
    </div>
  );
}
