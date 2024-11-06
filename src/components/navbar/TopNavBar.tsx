import { Link } from "react-router-dom";
import MenuIcon from "../../assets/icons/MenuIcon";
import { useUI } from "../../hooks/useUI";
import NavBarLinks from "./NavBarLinks";

export default function TopNavBar({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  const { toggleSidebar } = useUI();
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
