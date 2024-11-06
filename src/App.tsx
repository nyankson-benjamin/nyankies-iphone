import "./App.css";
import Confirmation from "./pages/auth/Confirmation";
import SignUp from "./pages/auth/SignUp";
import PageLayout from "./layout/PageLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import AfterSignUp from "./pages/auth/AfterSignUp";
import { RedirectIfAuthenticated } from "./components/AuthGuard";
import { RequireAuth } from "./components/AuthGuard";
import AdminPage from "./pages/admin/AdminPage";
import ResetPassword from "./pages/auth/ResetPassword";
import PasswordRecovery from "./pages/auth/PasswordRecovery";

function App() {
  return (
    <div>
      <PageLayout>
        <Routes>
          <Route path="/" element={<p className="text-3xl">Hello world</p>} />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfAuthenticated>
                <SignUp />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup-successfull"
            element={
              <RedirectIfAuthenticated>
                <AfterSignUp />
              </RedirectIfAuthenticated>
            }
          />

          <Route
            path="/confirm/:token"
            element={
              <RedirectIfAuthenticated>
                <Confirmation />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/reset/:token"
            element={
              <RedirectIfAuthenticated>
                <ResetPassword />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectIfAuthenticated>
                <PasswordRecovery />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth requiredRole="admin">
                <AdminPage />
              </RequireAuth>
            }
          >
            <Route path="dashboard" element={<p>Dashboard</p>} />
            <Route path="add-product" element={<p>Add Product</p>} />
            <Route path="edit-product" element={<p>Edit Product</p>} />
            <Route path="orders" element={<p>Orders</p>} />
            <Route path="customers" element={<p>Customers</p>} />
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
          <Route path="*" element={<p className="text-3xl">404 not found</p>} />
        </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
