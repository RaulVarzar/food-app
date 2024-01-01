import { createContext, useState, useEffect } from "react";

const CartContext = createContext({
    cartItems: [],
    totalPrice: null,
    addToCart: (item) => {},
    removeItem: (id) => {},
    emptyCart: () => {}
})

export function CartContextProvider({children}) {

    const [cartItems, setCartItems] = useState(localStorage.getItem('storedCart') ? JSON.parse(localStorage.getItem('storedCart')) : [])
    const totalPrice = cartItems.reduce((total, item) => (total = total + item.price * item.quantity), 0).toFixed(2);

    useEffect(() => {
        localStorage.setItem("storedCart", JSON.stringify(cartItems));
      }, [cartItems]);

    useEffect(() => {
        const storedCart = localStorage.getItem("storedCart")
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, []);

    function addToCart(item) {
        // check if item is already in cart
        const isInCart = cartItems.find((cartItem) => cartItem.id === item.id); 

        if (isInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? {...cartItem, quantity: cartItem.quantity + 1}
                        : {...cartItem}
                )
            )
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
    }

    function removeItem(itemToRemove) {
        // const itemToRemove = cartItems.find((item)=> item.id === item.id)
        
        if (itemToRemove.quantity === 1) {
            setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id))
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === itemToRemove.id
                        ? {...cartItem, quantity: cartItem.quantity - 1}
                        : {...cartItem}
                )
            )
        }
    }

    function emptyCart() {
        setCartItems([])
    }
    
    return <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeItem, emptyCart }} >{children}</CartContext.Provider>
}

export default CartContext

