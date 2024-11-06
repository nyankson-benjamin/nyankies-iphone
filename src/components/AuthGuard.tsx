import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/AuthStore';

// Redirect authenticated users away from auth pages
export const RedirectIfAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const {isAuthenticated} = useAuthStore();
  
  if (isAuthenticated) {
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
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && user?.role !== 'admin') {
    // Redirect to home if user doesn't have admin role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 