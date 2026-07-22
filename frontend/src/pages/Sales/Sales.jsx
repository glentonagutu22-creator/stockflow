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

      <div className="sales-header">

        <div>
          <span className="sales-badge">
            Point of Sale
          </span>

          <h1>Sales</h1>

          <p>
            Search products, build a cart and
            complete customer sales.
          </p>
        </div>

      </div>

      <div className="sales-layout">

        <section className="products-section">

          <SaleSearch
            search={search}
            setSearch={setSearch}
          />

          {loading ? (
            <div className="loading-products">
              Loading products...
            </div>
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
                <div className="empty-products">
                  No products found.
                </div>
              )}

            </div>
          )}

        </section>

        <aside className="cart-section">
          <Cart onSaleComplete={fetchProducts} />
        </aside>

      </div>

    </div>
  );
};

export default Sales;