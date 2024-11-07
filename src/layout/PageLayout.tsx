import TopNavBar from "../components/navbar/TopNavBar";
import AdminNavBar from "../components/navbar/AdminNavBar";
import SideBar from "../components/sidebar/SideBar";
import { useUI } from "../hooks/useUI";
import { useAuthStore } from "../store/AuthStore";
import { navLinks, navAuth, navLinksAdmin } from "../constants/Navlinks";
import OtherRoutes from "../components/OtherRoutes";
import { useScreenWidth } from "../hooks/useScreenWidth";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useUI();
  const { isAuthenticated, user } = useAuthStore();
  let links: { name: string; path: string }[] = [];
  if (!isAuthenticated) {
    links = navAuth;
  } else if (user?.role === "admin") {
    links = [...navLinks, ...navLinksAdmin];
  } else {
    links = navLinks;
  }
  const width = useScreenWidth();
  return (
    <div>
      <TopNavBar />
      {isSidebarOpen && <SideBar links={links} />}
      {isAuthenticated && user?.role === "admin" && <AdminNavBar />}
     { width < 768 && <OtherRoutes />}
      {children}
    </div>
  );
}
