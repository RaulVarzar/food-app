import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import CartContext from '../store/CartContext';
import OrderForm from './OrderForm';
import Cart from './Cart';
import UserProgress from '../store/UserProgress';

const Modal = forwardRef(function Modal({ e }, ref) {
  const [openCheckout, setOpenCheckout] = useState(false);
  const user = useContext(UserProgress);
  const cart = useContext(CartContext);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function closeModal() {
    dialog.current.close();
    setOpenCheckout(false);
    if (user.progress === 'finished') {
      cart.emptyCart();
    }
    user.updateProgress('shopping');
  }

  function toggleCheckout() {
    if (openCheckout) {
      setOpenCheckout(false);
      user.updateProgress('shopping');
    } else {
      setOpenCheckout(true);
      user.updateProgress('checkout');
    }
  }

  return createPortal(
    <dialog ref={dialog} className="text-center modal">
      <motion.div
        layout
        className="relative flex flex-row justify-center p-0 overflow-hidden transition-none rounded-lg bg-base-200 min-w-fit min-h-fit max-w-7xl w-fit duration-0 modal-box"
      >
        <div className="flex flex-col justify-center">
          {user.progress === 'finished' && (
            <h3 className="pt-8 text-2xl font-bold text-success">ORDER SENT</h3>
          )}
          <Cart
            openCheckout={openCheckout}
            setOpenCheckout={() => toggleCheckout()}
          />
        </div>
        {user.progress !== 'finished' && (
          <OrderForm
            closeForm={() => toggleCheckout()}
            openCheckout={openCheckout}
          />
        )}
      </motion.div>

      <form method="dialog" className="h-screen modal-backdrop">
        <button onClick={closeModal}></button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
