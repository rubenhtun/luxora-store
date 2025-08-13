import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import NavCategories from "./components/NavCategories";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";
import ProductsList from "./components/ProductLists";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
