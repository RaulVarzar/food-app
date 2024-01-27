import { useContext } from 'react';
import UserProgress from '../store/UserProgress';
import CartContext from '../store/CartContext';
import { motion } from 'framer-motion';

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
    y: 50,
    opacity: 0.2,
  },
  hide2: {
    x: -15,
    scaleX: 0.85,
    opacity: 0.8,
  },
  show2: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
  },
};

export default function CartItem({ item }) {
  const cart = useContext(CartContext);
  const user = useContext(UserProgress);

  const editable = user.progress !== 'checkout';
  return (
    <motion.li
      layout
      key={item.id}
      className="flex flex-row items-center justify-between w-full gap-1 overflow-hidden md:gap-10 md:p-2"
    >
      <motion.div
        layout="position"
        className="relative flex flex-row items-center gap-2"
      >
        {editable && (
          <button
            className="px-3 py-2 transition-all duration-200 text-neutral-content btn-lg opacity-70 hover:text-error hover:opacity-100"
            onClick={() => cart.removeItem(item)}
          >
            <i className=" fa-solid fa-trash-can"></i>
          </button>
        )}
        <img
          src={`http://localhost:3000/${item.image}`}
          alt="product"
          className="object-contain h-12 rounded-lg lg:h-14"
        />
        <div className="flex flex-col justify-start text-left">
          <h3 className="font-semibold lg:font-bold md:text-md md:text-xl">
            {item.name}
          </h3>
          <motion.span
            key={item.quantity}
            variants={variants}
            animate="show2"
            initial="hide2"
            className="text-sm md:text-md lg:font-semibold text-accent md:text-lg opacity-70"
          >
            ${(item.price * item.quantity).toFixed(2)}
          </motion.span>
        </div>
      </motion.div>
      {editable && (
        <div className="flex flex-row items-center gap-0.5 ">
          <div className="flex flex-row items-center gap-4 overflow-hidden transition duration-300 rounded-md shadow-sm bg-opacity-20 brightness-75 h-fit bg-secondary hover:brightness-100 hover:bg-opacity-800">
            <button
              className={
                'rounded-none btn-ghost btn btn-round btn-sm hover:btn-accent ' +
                (item.quantity === 1 && ' btn-disabled bg-transparent')
              }
              onClick={() => cart.decreaseQty(item)}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <motion.span
              key={item.quantity}
              variants={variants}
              animate="show"
              initial="hide"
              className="text-md md:text-lg font-semibold min-w-[18px]"
            >
              {item.quantity}
            </motion.span>
            <button
              className="rounded-none hover:btn-accent btn-ghost btn btn-round btn-sm"
              onClick={() => cart.addToCart(item)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      )}
      {!editable && <span className="text-xl font-bold">{item.quantity}</span>}
    </motion.li>
  );
}
