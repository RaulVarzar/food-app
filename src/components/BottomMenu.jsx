import { useContext, useRef } from 'react';
import Modal from './Modal';
import CartContext from '../store/CartContext';
import { motion } from 'framer-motion';
import UserProgress from '../store/UserProgress';

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
  const user = useContext(UserProgress);
  const view = user.productsView;
  const changeView = user.changeView;

  return (
    <>
      <Modal ref={modal} />
      <div className="fixed bottom-0 left-0 right-0 flex flex-row items-end justify-center gap-4 mx-auto z-1 w-fit">
        <div className="flex flex-row gap-1 mx-4 overflow-hidden text-lg rounded-none rounded-t-xl lg:mx-2 md:mx-4 join w-fit h-fit">
          <button
            className={
              'join-item btn btn-sm rounded-none' +
              (view === 'list' && ' btn-accent')
            }
            onClick={() => changeView('list')}
          >
            <i className="px-1 fa-solid fa-list"></i>
          </button>
          <button
            className={
              'join-item btn btn-sm rounded-none  ' +
              (view === 'grid' && ' btn-accent')
            }
            onClick={() => changeView('grid')}
          >
            <i className="px-1 fa-solid fa-border-all"> </i>
          </button>
        </div>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.1 }}
          className="flex flex-row items-center justify-between gap-6 px-6 py-3 transition-all duration-200 cursor-pointer bg-opacity-80 hover:bg-opacity-100 w-fit bg-accent rounded-t-xl hover:pb-5"
          onClick={() => modal.current.open()}
        >
          <h3 className="text-lg font-bold">SHOPPING CART</h3>
          <span className="px-2 py-1 rounded-lg shadow-md bg-opacity-30 bg-neutral">
            ${cart.totalPrice}
          </span>
        </motion.div>
      </div>
    </>
  );
}
