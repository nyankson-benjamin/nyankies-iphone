import { Link } from "react-router-dom";
import MenuIcon from "../../assets/icons/MenuIcon";
import { useUI } from "../../hooks/useUI";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import CategoriesDropDown from "./CategoriesDropDown";
import UserDropdown from "./UserDropdown";
import { useAuthStore } from "../../store/AuthStore";
import { authRoutes } from "../../constants/Navlinks";
import NavBarLinks from "./NavBarLinks";
import CartIcon from "../../assets/icons/CartIcon";
// import { useCartStore } from "../../store/CartStore";
import { useCartStore } from "../../store/useCart";

export default function TopNavBar() {
  const { toggleSidebar, closeSidebar } = useUI();
  const { isAuthenticated } = useAuthStore();
  const width = useScreenWidth();
  const { cart } = useCartStore();

  if (width > 768) closeSidebar();
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
    <nav className="h-16 shadow-sm bg-white">
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center gap-2">
          <MenuIcon
            onClick={() => toggleSidebar()}
            className="block md:hidden lg:hidden xl:hidden"
          />
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <Link to="/cart" className="text-primaryDeep flex items-center relative">
            <CartIcon />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Link>
          {width > 768 && <CategoriesDropDown />}
          {!isAuthenticated && <NavBarLinks links={authRoutes} />}
          {isAuthenticated && <UserDropdown />}
        </div>
      </div>
    </nav>
  );
}
