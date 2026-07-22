import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import AppLayout from "./components/layout/AppLayout";

/* Pages */
import ReceiptSettings from "./pages/settings/ReceiptSettings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Suppliers from "./pages/Suppliers/Suppliers";
import Purchases from "./pages/Purchases/Purchases";
import Customers from "./pages/Customers/Customers";
import Sales from "./pages/Sales/Sales";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            token ? (
              <Navigate
                to="/dashboard"
                replace
              />
            ) : (
              <Register />
            )
          }
        />

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/suppliers"
            element={<Suppliers />}
          />

          <Route
            path="/purchases"
            element={<Purchases />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />
          <Route
  path="/settings"
  element={<Settings />}

/>
<Route
  path="/settings/receipt"
  element={<ReceiptSettings />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        </Route>

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                token
                  ? "/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;