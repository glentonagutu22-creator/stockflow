import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";

import ProductCard from "../../components/sales/ProductCard/ProductCard";
import Cart from "../../components/sales/Cart/Cart";
import SaleSearch from "../../components/sales/SaleSearch/SaleSearch";

import { useSale } from "../../context/SaleContext";

import "./Sales.css";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { addToCart } = useSale();

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        search,
        page: 1,
        limit: 100,
      });

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sales-page">
      <div className="products-section">
        <h2>Products</h2>

        <SaleSearch
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <h3>Loading products...</h3>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={addToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </div>

      <div className="cart-section">
        <Cart onSaleComplete={fetchProducts} />
      </div>
    </div>
  );
};

export default Sales;