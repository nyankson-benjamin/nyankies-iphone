
import { Outlet } from 'react-router-dom';

export default function AdminPage() {
  return (
    <div>
      {/* Add any admin layout elements here */}
      <Outlet />
    </div>
  );
}
