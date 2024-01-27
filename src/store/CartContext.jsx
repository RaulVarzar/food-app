import { createContext, useState, useEffect } from 'react';

const CartContext = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: (item) => {},
  decreaseQty: (id) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('storedCart')
      ? JSON.parse(localStorage.getItem('storedCart'))
      : []
  );
  let totalPrice = cartItems.reduce(
    (total, item) => (total = total + item.price * item.quantity),
    0
  );

  if (totalPrice > 0) {
    totalPrice = totalPrice.toFixed(2);
  }

  useEffect(() => {
    localStorage.setItem('storedCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCart = localStorage.getItem('storedCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  function addToCart(item) {
    // check if item is already in cart
    const isInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : { ...cartItem }
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }

  function decreaseQty(itemToRemove) {
    const currentItem = cartItems.find((item) => item.id === itemToRemove.id);

    if (currentItem.quantity === 1) {
      removeItem(itemToRemove);
      return;
    }
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === itemToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : { ...cartItem }
      )
    );
  }

  function removeItem(itemToRemove) {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  }

  function emptyCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        decreaseQty,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
