import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/user/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddProduct from "./pages/seller/AddProduct";
import Dashboard from "./pages/seller/Dashboard";
import MyProducts from "./pages/seller/MyProducts";
import EditProduct from "./pages/seller/EditProduct";
import Marketplace from "./pages/user/Marketplace";
import Cart from "./pages/user/Cart";
import Navbar from "./components/layout/Navbar";
import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/OrderSuccess";
import Orders from "./pages/user/Orders";
import Wishlist from "./pages/user/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEntrepreneurs from "./pages/admin/ManageEntrepreneurs";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageOrders from "./pages/admin/ManageOrders";
function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Buyer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/order-success"
  element={
    <ProtectedRoute>
      <OrderSuccess />
    </ProtectedRoute>
  }
/>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Seller Routes */}
        <Route
  path="/seller/dashboard"
  element={
    <ProtectedRoute sellerOnly={true}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/add-product"
  element={
    <ProtectedRoute sellerOnly={true}>
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/my-products"
  element={
    <ProtectedRoute sellerOnly={true}>
      <MyProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/edit-product/:id"
  element={
    <ProtectedRoute sellerOnly={true}>
      <EditProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/entrepreneurs"
  element={
    <ProtectedRoute>
      <ManageEntrepreneurs />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <ManageUsers />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <ManageProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedRoute>
      <ManageOrders />
    </ProtectedRoute>
  }
/>
        
      </Routes>
    </>
  );
}

export default App;