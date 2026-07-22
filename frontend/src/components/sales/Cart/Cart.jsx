import { useState } from "react";
import { toast } from "react-toastify";

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingCart,
} from "react-icons/fi";

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

  const change = Math.max(
    0,
    Number(amountPaid || 0) - subtotal
  );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return toast.warning("Cart is empty.");
    }

    if (
      paymentMethod === "Cash" &&
      Number(amountPaid || 0) < subtotal
    ) {
      return toast.error(
        "Amount paid is less than the total."
      );
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

      <div className="cart-header">
        <FiShoppingCart />
        <h2>Current Sale</h2>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <FiShoppingCart size={40} />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >
                <div className="cart-info">
                  <h4>{item.name}</h4>

                  <small>
                    KSh {item.sellingPrice.toLocaleString()}
                  </small>
                </div>

                <div className="cart-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    <FiMinus />
                  </button>

                  <span>{item.cartQuantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    <FiPlus />
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
                  <FiTrash2 />
                </button>
              </div>
            ))}

          </div>

          <div className="cart-summary">

            <div className="summary-row">
              <span>Total Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="summary-row total">
              <span>Total</span>

              <strong>
                KSh {subtotal.toLocaleString()}
              </strong>
            </div>

            <label>Payment Method</label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >
              <option>Cash</option>
              <option>Mpesa</option>
              <option>Card</option>
            </select>

            {paymentMethod === "Cash" && (
              <>
                <label>Amount Paid</label>

                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) =>
                    setAmountPaid(
                      e.target.value
                    )
                  }
                  placeholder="Enter amount"
                />

                <div className="summary-row">
                  <span>Change</span>

                  <strong>
                    KSh {change.toLocaleString()}
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
                : "Complete Sale"}
            </button>

          </div>
        </>
      )}
    </div>
  );
};

export default Cart;