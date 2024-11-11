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
import ProductsPage from "./pages/ProductsPage";
import { AddProduct } from "./pages/admin/AddProduct";
import ProductsOutlet from "./pages/ProductsOutlet";
import CategoriesPage from "./pages/CategoriesPage";
import CartPage from "./pages/CartPage";  
import OrdersPage from "./pages/admin/forms/OrdersPage";
import { Customers } from "./pages/admin/Customers";
function App() {
  return (
    <div>
      <PageLayout>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/categories" element={<ProductsOutlet />}> 
            <Route path=":categoryId" element={<CategoriesPage />} />
          </Route>
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
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth requiredRole="admin">
                <AdminPage />
              </RequireAuth>
            }
          >
            <Route path="dashboard" element={<ProductsPage/>} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product" element={<p>Edit Product</p>} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="order/:orderId" element={<p>Order Details</p>} />
            <Route path="customers" element={<Customers />} />
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
