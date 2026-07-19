import { useState } from "react";
import { toast } from "react-toastify";

import "./Cart.css";

import { useSale } from "../../../context/SaleContext";
import { createSale } from "../../../services/saleService";

const Cart = ({ onSaleComplete }) => {
  const {
    cart,
    subtotal,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useSale();

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [loading, setLoading] = useState(false);

  const change = Math.max(0, Number(amountPaid || 0) - subtotal);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return toast.warning("Cart is empty.");
    }

    if (
      paymentMethod === "Cash" &&
      Number(amountPaid || 0) < subtotal
    ) {
      return toast.error("Amount paid is less than the total.");
    }

    try {
      setLoading(true);

      const saleData = {
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.cartQuantity,
        })),
        paymentMethod,
        totalAmount: subtotal,
        amountPaid:
          paymentMethod === "Cash"
            ? Number(amountPaid)
            : subtotal,
      };

      await createSale(saleData);

      toast.success("Sale completed successfully.");

      clearCart();
      setAmountPaid("");
      setPaymentMethod("Cash");

      if (onSaleComplete) {
        await onSaleComplete();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to complete sale."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <h2>Current Sale</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">No products selected.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p>
                    KSh {item.sellingPrice.toLocaleString()}
                  </p>
                </div>

                <div className="cart-controls">
                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    -
                  </button>

                  <span>{item.cartQuantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart-total">
                  KSh{" "}
                  {(
                    item.sellingPrice *
                    item.cartQuantity
                  ).toLocaleString()}
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item._id)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              <strong>Items:</strong> {totalItems}
            </p>

            <h3>
              Total: KSh {subtotal.toLocaleString()}
            </h3>

            <div className="payment-method">
              <label>Payment Method</label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              >
                <option value="Cash">Cash</option>
                <option value="Mpesa">Mpesa</option>
                <option value="Card">Card</option>
              </select>
            </div>

            {paymentMethod === "Cash" && (
              <>
                <div className="payment-input">
                  <label>Amount Paid</label>

                  <input
                    type="number"
                    min="0"
                    value={amountPaid}
                    onChange={(e) =>
                      setAmountPaid(e.target.value)
                    }
                    placeholder="Enter amount paid"
                  />
                </div>

                <div className="change-display">
                  <strong>
                    Change: KSh {change.toLocaleString()}
                  </strong>
                </div>
              </>
            )}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;