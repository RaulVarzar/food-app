import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { motion } from 'framer-motion';
import CartItem from './CartItem';

export default function CartItems() {
  const cart = useContext(CartContext);

  return (
    <motion.ul className="flex flex-col items-center gap-2 px-2 py-2 md:px-6 ">
      {cart.cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </motion.ul>
  );
}
