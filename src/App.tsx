import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import ProductsPage from "./pages/admin/ProductsPage";
import AddProduct from "./pages/admin/AddProductPage";
import { useEffect } from "react";
import { authService } from "./services/authService";
import ComingSoon from "./pages/ComingSoon";

function App() {
  useEffect(() => {
    authService.getCurrentUser(); // persist session from supabase
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/orders" element={<ComingSoon title="Order Management" />} />
        <Route path="/admin/reviews" element={<ComingSoon title="Review Management" />} />
        <Route path="/admin/users" element={<ComingSoon title="User Management" />} />

        {/* Optional Redirect from dashboard to products */}
        <Route
          path="/admin/dashboard"
          element={<Navigate to="/admin/products" replace />}
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* 404 Page */}
        <Route path="*" element={<div className="p-8 text-center">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
