import TopNavBar from "../components/navbar/TopNavBar";
import AdminNavBar from "../components/navbar/AdminNavBar";
import SideBar from "../components/sidebar/SideBar";
import { useUI } from "../hooks/useUI";
import { useAuthStore } from "../store/AuthStore";
import { navLinks, navAuth, navLinksAdmin } from "../constants/Navlinks";
import OtherRoutes from "../components/OtherRoutes";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { isLoggedIn } from "../services/auth";
export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarOpen } = useUI();
  const { user } = useAuthStore();
  let links: { name: string; path: string }[] = [];
  if (!isLoggedIn()) {
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
      {isLoggedIn() && user?.role === "admin" && <AdminNavBar />}
     { width < 768 && <OtherRoutes />}
      {children}
    </div>
  );
}
