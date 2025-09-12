import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Landing Page Components
import Banner from "../components/landing/Banner";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import MainNav from "../components/landing/MainNav";
import NavCategories from "../components/landing/NavCategories";
import ProductsList from "../components/landing/ProductLists";

// Admin
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Customers from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";
import AddNewProduct from "../pages/admin/AddNewProduct";

// Auth
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
// import Logout from "../pages/auth/Logout";

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
        {/* <Route path="/logout" element={<Logout />} /> */}

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-new-product" element={<AddNewProduct />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
