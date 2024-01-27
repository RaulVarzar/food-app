import CartContext from '../store/CartContext.jsx';
import { useContext } from 'react';
import { getTime } from '../utils/getTime.js';
import useFetch from '../hooks/useFetch.js';
import { AnimatePresence, motion } from 'framer-motion';
import UserProgress from '../store/UserProgress.jsx';
import CheckoutInput from './CheckoutInput.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const variants = {
  show: {
    x: 0,
    transition: {
      ease: 'anticipate',
      duration: 0.4,
    },
  },
  hide: {
    x: '100%',
  },
  exit: {
    x: '100%',
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
  },
};

export default function OrderForm({ closeForm, openCheckout }) {
  const user = useContext(UserProgress);

  const { isFetching, fetchedData, sendRequest } = useFetch(
    'orders',
    requestConfig
  );
  const cart = useContext(CartContext);

  function handleRadio(event) {
    user.updateCheckoutDetails('payment', event.target.value);
  }

  console.log(user.checkoutDetails);
  // function handleInput(field, event) {
  //   user.updateCheckoutDetails(field, event.target.value);
  // }

  function handleSubmit(event) {
    event.preventDefault();
    const customerData = user.checkoutDetails;
    sendRequest(
      JSON.stringify({
        order: {
          items: cart.cartItems,
          customer: customerData,
          totalPrice: cart.totalPrice,
          day: new Date().toDateString(),
          time: getTime(),
        },
      })
    );
  }

  if (fetchedData.message) {
    user.updateProgress('finished');
  }

  return (
    <>
      <AnimatePresence mode="popLayout">
        {openCheckout && (
          <motion.div
            variants={variants}
            initial="hide"
            exit="exit"
            animate="show"
          >
            <button
              className="absolute btn btn-ghost w-fit top-2 left-2 rounded-xl"
              onClick={closeForm}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center h-full gap-3 px-10 py-8 bg-base-300 rounded-l-xl"
            >
              <h3 className="mx-auto text-2xl font-bold w-fit">CHECKOUT</h3>
              <div className="flex flex-col md:gap-4 md:flex-row">
                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={user.checkoutDetails['name']}
                    onChange={(event) =>
                      user.updateCheckoutDetails('name', event.target.value)
                    }
                    required
                    className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "
                  />
                  <label
                    htmlFor="name"
                    className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content"
                  >
                    Full Name
                  </label>
                </div>
                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                  <input
                    value={user.checkoutDetails['email']}
                    onChange={(event) =>
                      user.updateCheckoutDetails('email', event.target.value)
                    }
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "
                  />
                  <label
                    htmlFor="email"
                    className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content"
                  >
                    email
                  </label>
                </div>
              </div>

              <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                <input
                  value={user.checkoutDetails['street']}
                  onChange={(event) =>
                    user.updateCheckoutDetails('street', event.target.value)
                  }
                  type="text"
                  name="street"
                  id="street"
                  required
                  className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "
                />
                <label
                  htmlFor="street"
                  className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content"
                >
                  Full address
                </label>
              </div>

              <div className="flex flex-col md:gap-4 md:flex-row">
                <CheckoutInput
                  name={'city'}
                  type={'text'}
                  value={user.checkoutDetails.city}
                  onChange={(event) => {
                    user.updateCheckoutDetails('city', event.target.value);
                  }}
                >
                  city
                </CheckoutInput>
                <CheckoutInput
                  name={'postcode'}
                  type={'text'}
                  value={user.checkoutDetails.postcode}
                  onChange={(event) => {
                    user.updateCheckoutDetails('postcode', event.target.value);
                  }}
                >
                  Postcode
                </CheckoutInput>
              </div>

              <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                <input
                  value={user.checkoutDetails['phone']}
                  onChange={(event) =>
                    user.updateCheckoutDetails('phone', event.target.value)
                  }
                  type="text"
                  name="phone"
                  id="phone"
                  required
                  className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "
                />
                <label
                  htmlFor="phone"
                  className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content"
                >
                  Phone number
                </label>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <span className="text-xl">PAYMENT</span>

                <div className="flex flex-col gap-x-6 md:flex-row">
                  <label className="gap-2 cursor-pointer label">
                    <span className="label-text">Cash</span>
                    <input
                      type="radio"
                      className="checkbox"
                      id="cash"
                      checked={user.checkoutDetails.payment === 'cash'}
                      name="payment"
                      value="cash"
                      onChange={handleRadio}
                    />
                  </label>
                  <label className="gap-2 cursor-pointer label ">
                    <span className="label-text">Card (POS)</span>
                    <input
                      type="radio"
                      className="checkbox"
                      id="card"
                      checked={user.checkoutDetails.payment === 'card'}
                      name="payment"
                      value="card"
                      onClick={handleRadio}
                    />
                  </label>
                  <label className="gap-2 cursor-pointer label">
                    <span className="label-text">Card Online</span>
                    <input
                      type="radio"
                      className="checkbox"
                      id="online-card"
                      name="payment"
                      checked={user.checkoutDetails.payment === 'online-card'}
                      value="online-card"
                      onClick={handleRadio}
                    />
                  </label>
                </div>

                <textarea
                  type="textarea"
                  name="comment"
                  id="comment"
                  placeholder="Special requests (optional)"
                  className="w-full p-1 text-base font-medium text-left transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "
                />
              </div>
              {isFetching ? (
                <span className="mx-auto loading loading-spinner loading-lg"></span>
              ) : (
                <button className="mx-auto uppercase btn-accent btn btn-outline btn-md w-fit ">
                  Submit order
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
