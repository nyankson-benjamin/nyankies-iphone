import { Link } from "react-router-dom";
import MenuIcon from "../../assets/icons/MenuIcon";
import { useUI } from "../../hooks/useUI";
import NavBarLinks from "./NavBarLinks";
import { navAuth, navLinks } from "../../constants/Navlinks";
import { useAuthStore } from "../../store/AuthStore";
export default function TopNavBar() {
  const { toggleSidebar } = useUI();
  const { isAuthenticated } = useAuthStore();

  const links = isAuthenticated ? navLinks : navAuth;   
  const Logo = () => {
    return (
      <Link
        to="/"
        className="text-primaryDeep font-extrabold text-xl sm:text-2xl md:text-3xl italic"
      >
        Nyankies iShop
      </Link>
    );
  };
 
  return (
    <nav className="h-16 shadow-sm">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center gap-2">
          <MenuIcon
            onClick={() => toggleSidebar()}
            className="block md:hidden lg:hidden xl:hidden"
          />
          <Logo />
        </div>
        <NavBarLinks links={links} />
      </div>
    </nav>
  );
}
