import { useContext } from 'react';

import { motion } from 'framer-motion';
import CartContext from '../store/CartContext';

export default function Product({ product, index }) {
  const cart = useContext(CartContext);

  const productInCart = cart.cartItems.some((item) => item.id === product.id);

  const qty = cart.cartItems.find((item) => item.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 + index * 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.05, ease: 'easeIn' },
      }}
      className={
        'relative flex flex-col items-center content-center justify-between max-w-xs mx-auto gap-1 lg:max-w-6xl p-2.5 pb-4 overflow-hidden rounded-2xl shadow-lg  hover:brightness-110 transition-all duration-300 group ' +
        (productInCart ? ' bg-primary-content ' : ' bg-primary-content')
      }
    >
      <div className="flex flex-col gap-1.5 p-1.5">
        <img
          src={`http://localhost:3000/${product.image}`}
          alt="individual-product"
          className="w-full h-auto transition-all duration-200 rounded-xl "
        />
        <div className="flex flex-col w-full gap-1 px-2 pt-3 ">
          <div className="flex flex-row items-end justify-between ">
            <h3 className="text-xl font-semibold tracking-wide uppercase text-slate-200">
              {product.name}
            </h3>
            <p className="text-sm font-semibold tracking-wide text-base-content">
              {product.grams}g
            </p>
          </div>
          <span className="text-sm font-light leading-none tracking-wide line-clamp-2 opacity-40 text-neutral-content">
            {product.description}
          </span>
        </div>
      </div>

      <div className="relative flex flex-row items-center justify-between w-full gap-2 px-3 text-center cursor-pointer">
        <span className="px-2 text-xl font-bold tracking-wide text-accent opacity-80">
          ${product.price}
        </span>
        {!productInCart && (
          <button
            className="flex items-center gap-2 px-3 py-1.5 transition duration-300 rounded-lg shadow-sm hover:scale-103 bg-base-content bg-opacity-5 btn-neutral btn-ghost"
            onClick={() => cart.addToCart(product)}
          >
            Add to cart
            <i className="text-lg text-gray-300 transition duration-300 fa-solid fa-cart-plus group-hover:scale-105 group-hover:text-accent"></i>
          </button>
        )}

        {productInCart && (
          <div className="items-center overflow-hidden transition-all duration-300 opacity-70 join bg-secondary bg-opacity-10 hover:bg-opacity-20 hover:opacity-100">
            <button
              className="flex items-center gap-2 px-3 py-1.5 transition btn-ghost"
              onClick={() => cart.decreaseQty(product)}
            >
              <i className="text-xl fa-solid fa-minus"></i>
            </button>
            <span className="w-10">{qty.quantity}</span>
            <button
              className="flex items-center gap-2 px-3 py-1.5 transition btn-ghost"
              onClick={() => cart.addToCart(product)}
            >
              {' '}
              <i className="text-xl fa-solid fa-plus"></i>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
