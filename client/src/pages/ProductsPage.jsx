import Header from "../components/Header";
import MainNav from "../components/MainNav";
import NavCategories from "../components/NavCategories";
import ProductsList from "../components/ProductsList";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <MainNav />
      <NavCategories />
      <div className="container mx-auto mt-6">
        <ProductsList />
      </div>
    </>
  );
}
