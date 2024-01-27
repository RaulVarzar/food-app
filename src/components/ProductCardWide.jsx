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
        transition: { duration: 0.15, ease: 'easeIn' },
      }}
      className="relative w-full sm:w-10/12 h-fit p-1.5 md:w-1/2 xl:w-1/3"
    >
      <div className="flex relative flex-row gap-1.5 p-2.5 pb-4 w-full justify-between overflow-hidden rounded-lg shadow-md bg-primary-content hover:brightness-110 transition-all duration-200 ">
        <img
          src={`http://localhost:3000/${product.image}`}
          alt="individual-product"
          className="object-cover w-1/3 rounded-lg"
        />

        <div className="flex flex-col justify-between p-1">
          <div className="flex flex-col gap-1 border-base-100">
            <h3 className="text-lg font-semibold tracking-wide uppercase lg:text-xl text-slate-200">
              {product.name}
            </h3>
            <span className="text-sm font-light leading-none tracking-wide opacity-40 text-neutral-content">
              {product.description}
            </span>
          </div>

          <div className="relative flex flex-row items-center justify-between w-full text-center cursor-pointer">
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
        </div>
      </div>
    </motion.div>
  );
}
