import { useState, useEffect } from "react";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-4">Product Component</h1>
      {/* Product details will go here */}
      {products ? (
        <ul className="mx-auto max-w-md space-y-4">
          {products.map((product) => (
            <li key={product._id} className="p-4 border rounded shadow">
              {product.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}
