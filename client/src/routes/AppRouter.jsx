import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../components/ProtectedRoute";

// Landing Page Components
import Banner from "../components/landing/Banner";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import MainNav from "../components/landing/MainNav";
import NavCategories from "../components/landing/NavCategories";
import ProductsList from "../components/landing/ProductLists";

// Auth
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

// User Profile
import ProfileLayout from "../components/layouts/ProfileLayout";
import UserInfo from "../components/user/UserInfo";
import AddressBook from "../components/user/AddressBook";
import Orders from "../components/user/Orders";
import Wishlist from "../components/user/Wishlist";
import PaymentMethods from "../components/user/PaymentMethods";
import Reviews from "../components/user/Reviews";
import SecuritySettings from "../components/user/SecuritySettings";
import AppPreferences from "../components/user/AppPreferences";
import Rewards from "../components/user/Rewards";
import Support from "../components/user/Support";

// Admin Dashboard
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../components/admin/Dashboard";
import Products from "../components/admin/Products";
import UserOrders from "../components/admin/UserOrders";
import Customers from "../components/admin/Customers";
import Settings from "../components/admin/Settings";
import AddNewProduct from "../components/admin/AddNewProduct";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Site */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <MainNav />
              <NavCategories />
              <Banner />
              <ProductsList />
              <Footer />
            </div>
          }
        />

        {/* Auth */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserInfo />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address-book" element={<AddressBook />} />
          <Route path="payment-methods" element={<PaymentMethods />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="preferences" element={<AppPreferences />} />
          <Route path="security-settings" element={<SecuritySettings />} />
          <Route path="support" element={<Support />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="user-orders" element={<UserOrders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-new-product" element={<AddNewProduct />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} className="z-50" />
    </BrowserRouter>
  );
}
