import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUI } from "../../hooks/useUI";

export default function SideBar({
  links,
}: {
  links: { name: string; path: string }[];
}) {
  const location = useLocation();
  const { toggleSidebar } = useUI();
  
  return (
    <aside
      className="fixed top-15 left-0 h-fit bg-white dark:bg-gray-800 
      p-4 shadow-lg w-64 z-50
      block md:hidden lg:hidden xl:hidden
      border-r border-gray-200 dark:border-gray-700
      animate-slide-in-left
      transform transition-all duration-300 ease-in-out
      hover:shadow-xl"
    >
      <nav className="flex flex-col space-y-4 ">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-gray-700 dark:text-gray-200 hover:bg-gray-100 
          dark:hover:bg-gray-700 rounded-md p-2 cursor-pointer 
          transform transition-all duration-200
          hover:scale-105 hover:translate-x-2
          active:scale-95 ${
            location.pathname === link.path ? "font-bold " : ""
          }`}
          onClick={() => toggleSidebar()}
          >
            {link.name}
          </Link>
        ))}
        
      </nav>
    </aside>
  );
}
