import CartContext from "../store/CartContext.jsx"
import { useContext, useRef } from "react"
import { getTime } from "../utils/getTime.js"
import useFetch from "../hooks/useFetch.js"
import { AnimatePresence, motion } from "framer-motion"
import Modal from "./SuccessModal.jsx"
import UserProgress from "../store/UserProgress.jsx"

const requestConfig = {
    method: "POST",
    headers: { 
        "Content-Type": "application/json"
    },
}

export default function OrderForm({closeForm, openCheckout}) {

    const user = useContext(UserProgress)

    const {
        isFetching,  
        fetchedData,
        sendRequest
      } = useFetch('orders', requestConfig)
    const cart = useContext(CartContext)

    function handleSubmit(event) {
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        sendRequest(
            JSON.stringify({
                order:{
                    items: cart.cartItems, 
                    customer: customerData,
                    totalPrice: cart.totalPrice,
                    day: new Date().toDateString(),
                    time: getTime()
                }
            })
        )
    }

    if (fetchedData.message) {
        user.updateProgress("finished")
    }

    const variants = {
        show: {
          x: 0,
          transition: {
            ease: 'anticipate',
            duration: 0.4,
          },
        },
        hide: {
          x: "100%"
        },
        exit: {
            x: "100%",
            opacity:1,
            transition: {
              ease: 'easeOut',
              duration: 0.3,
            },
          }
      };

    return(
        <>
        <AnimatePresence mode="popLayout">
            {openCheckout && <motion.div variants={variants} initial="hide" exit="exit" animate="show">                
                        
            <button className="absolute btn btn-ghost w-fit top-2 left-2 rounded-xl" onClick={closeForm}><i className="fa-solid fa-xmark"></i></button>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 px-10 py-8 bg-base-300 rounded-l-xl">
                    <h3 className="mx-auto text-2xl font-bold w-fit">CHECKOUT</h3>
                    <div className="flex flex-col md:gap-4 md:flex-row">
                        <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                            <input type="text" name="name" id="name" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                            <label htmlFor="name" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                                Full Name
                            </label>
                        </div>
                        <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                            <input type="email" name="email" id="email" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                            <label htmlFor="email" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                                email
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                        <input type="text" name="street" id="street" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                        <label htmlFor="street" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                            Full address 
                        </label>
                    </div>

                    <div className="flex flex-col md:gap-4 md:flex-row">
                        <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                            <input type="text" name="city" id="city" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                            <label htmlFor="city" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                                City
                            </label>
                        </div>

                        <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                            <input type="text" name="postal-code" id="postal-code" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                            <label htmlFor="postal-code" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                                Postcode
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                        <input type="text" name="phone" id="phone" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                        <label htmlFor="phone" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                            Phone number
                        </label>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 py-4">
                        <span className="text-xl">PAYMENT</span>

                        <div className="flex flex-col gap-x-6 md:flex-row">
                            <label className="gap-2 cursor-pointer label">
                                <span className="label-text">Cash</span> 
                                <input type="radio" className="checkbox" checked name="payment" value="cash"/>
                            </label>
                            <label className="gap-2 cursor-pointer label ">
                                <span className="label-text">Card (POS)</span> 
                                <input type="radio" className="checkbox" checked name="payment" value="card"/>
                            </label>
                            <label className="gap-2 cursor-pointer label">
                                <span className="label-text">Card Online</span> 
                                <input type="radio" className="checkbox" checked name="payment" value="online-card"/>
                            </label>
                        </div>

                    <textarea type="textarea" name="comment" id="comment" placeholder="Special requests (optional)" className="w-full p-1 text-base font-medium text-left transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>   

                    </div>
                    {isFetching
                        ? <span className="mx-auto loading loading-spinner loading-lg"></span>
                        : <button className="mx-auto uppercase btn btn-outline btn-md w-fit ">Submit order</button>
                    }
                    
                </form>
                </motion.div>
            }
            </AnimatePresence>
        </>
    )
}