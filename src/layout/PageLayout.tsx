import TopNavBar from "../components/navbar/TopNavBar";
import SideBar from "../components/sidebar/SideBar";
import { useUI } from "../hooks/useUI";
import { useAuthStore } from "../store/AuthStore";
import { navLinks, navAuth, navLinksAdmin } from "../constants/Navlinks";
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
    links = navLinksAdmin;
  } else {
    links = navLinks;
  }
  return (
    <div>
      <TopNavBar links={links} />
      {isSidebarOpen && <SideBar links={links} />}
      {children}
    </div>
  );
}
