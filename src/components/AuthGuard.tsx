import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';
import { isLoggedIn } from '../services/auth';

// Redirect authenticated users away from auth pages
export const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  
  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const RequireAuth = ({ 
  children, 
  requiredRole = 'user' // default role, can be 'admin' or other roles
}: { 
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { user } = useAuthStore();

  if (!isLoggedIn()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && user?.role !== 'admin') {
    // Redirect to home if user doesn't have admin role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 