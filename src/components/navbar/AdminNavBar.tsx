import NavBarLinks from "./NavBarLinks";
import { navLinksAdmin } from "../../constants/Navlinks";
import ResponsiveContainer from "../ResponsiveContainer";
export default function AdminNavBar() {
  return (
    <ResponsiveContainer>
      <nav className="h-16 shadow-sm">
        <div className="flex justify-between items-center h-full px-4">
          <NavBarLinks links={navLinksAdmin} showLogout={false} showCategories={false} showProfile={false} />
        </div>
      </nav>
    </ResponsiveContainer>
  );
}
