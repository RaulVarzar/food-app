import CartItems from './CartItems';
import { FromBottom, FromTop } from '../utils/animations';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import CartContext from '../store/CartContext';

const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
  },
  hide: {
    y: 10,
    opacity: 0.2,
  },
};

export default function Cart({ openCheckout, setOpenCheckout }) {
  const cart = useContext(CartContext);
  const notEmpty = cart.totalPrice > 0;

  return (
    <motion.div
      layout
      className="relative flex flex-col h-full gap-4 px-6 pt-6 pb-0"
    >
      {!openCheckout && (
        <FromTop delay={0.15} duration={0.15}>
          <motion.h3 layout="position" className="text-2xl font-bold">
            SHOPPING CART
          </motion.h3>
        </FromTop>
      )}

      <motion.div
        layout="position"
        className="relative flex flex-col justify-between h-fit"
      >
        <div className="overflow-y-scroll max-h-[60vh] bg-base-300 bg-opacity-40 rounded-xl">
          <CartItems />
        </div>
        <motion.div
          layout="position"
          className="static flex flex-col justify-center py-4 mb-6 h-fit"
        >
          {!notEmpty ? (
            <span className="text-lg italic opacity-60">
              No items in the cart.
            </span>
          ) : (
            <span className="flex flex-col self-center gap-0 px-4 py-2 rounded-lg w-fit">
              <p className="text-lg font-semibold lg:text-xl brightness-75">
                TOTAL:
              </p>
              <motion.span
                variants={variants}
                initial="hide"
                animate="show"
                key={cart.totalPrice}
                className="text-2xl font-bold lg:text-3xl"
              >
                ${cart.totalPrice}
              </motion.span>
            </span>
          )}

          <AnimatePresence mode="sync">
            {!openCheckout && notEmpty && (
              <FromBottom delay={0.15} duration={0.15} key={openCheckout}>
                <div className="flex mx-auto mt-2 gap-x-4 w-fit ">
                  <button
                    className="text-sm font-bold uppercase btn btn-ghost hover:text-error"
                    onClick={() => cart.emptyCart()}
                  >
                    Empty cart
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="text-sm font-bold uppercase btn btn-accent btn-outline hover:btn-accent"
                    onClick={() => setOpenCheckout()}
                  >
                    CHECKOUT
                    <i className="fa-solid fa-caret-right"></i>
                  </button>
                </div>
              </FromBottom>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
