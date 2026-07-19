import { createContext, useContext, useMemo, useState } from "react";

const SaleContext = createContext();

export const SaleProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        // Don't allow selling more than available stock
        if (existingItem.cartQuantity >= product.quantity) {
          return prevCart;
        }

        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1,
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id !== productId) return item;

        if (item.cartQuantity >= item.quantity) {
          return item;
        }

        return {
          ...item,
          cartQuantity: item.cartQuantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1,
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.sellingPrice * item.cartQuantity,
      0
    );
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.cartQuantity,
      0
    );
  }, [cart]);

  return (
    <SaleContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export const useSale = () => useContext(SaleContext);