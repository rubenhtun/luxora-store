// Third-party libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Landing Page Internal components
import AdminLayout from "./components/admin/AdminLayout";
import Banner from "./components/landing/Banner";
import Footer from "./components/landing/Footer";
import Header from "./components/landing/Header";
import MainNav from "./components/landing/MainNav";
import NavCategories from "./components/landing/NavCategories";
import ProductsList from "./components/landing/ProductLists";

// Dashboard Internal pages
import Customers from "./pages/admin/Customers";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import Settings from "./pages/admin/Settings";
import AddNewProduct from "./pages/admin/AddNewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Site Routes */}
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

        {/* Admin Routes */}
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

export default App;
