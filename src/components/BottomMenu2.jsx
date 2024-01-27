import { useContext, useRef } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import { motion } from 'framer-motion';

export const variants = {
  show: {
    y: 0,
    transition: {
      ease: 'anticipate',
      duration: 0.4,
    },
  },
  hide: {
    y: '100%',
    transition: {
      ease: 'easeIn',
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    opacity: 1,
  },
};

export default function BottomMenu() {
  const modal = useRef();
  const cart = useContext(CartContext);

  return (
    <>
      <Modal ref={modal} />
      <div className="relative flex flex-row items-end justify-center w-full z-1">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.1 }}
          className="flex flex-row items-center justify-between w-full gap-6 p-4 transition-all duration-200 shadow-2xl cursor-pointer bg-base-300 hover:bg-primary-content rounded-xl"
          onClick={() => modal.current.open()}
        >
          <h3 className="relative font-bold text-md w-fit">
            <p className="absolute px-1 text-sm text-white rounded-full bg-accent -top-2 -right-3">
              {cart.cartItems.length}
            </p>
            <i className="text-2xl fa-solid fa-cart-shopping"></i>
          </h3>
          {cart.totalPrice > 0 && (
            <span className="px-3 py-1.5 text-md font-semibold rounded-lg shadow-md bg-primary-content">
              ${cart.totalPrice}
            </span>
          )}
          {cart.totalPrice === 0 && (
            <span className="px-2 py-1 text-sm italic font-semibold rounded-lg shadow-md opacity-50">
              No items
            </span>
          )}
        </motion.div>
      </div>
    </>
  );
}
