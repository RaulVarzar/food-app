import { useContext, useRef } from "react"
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import {motion} from "framer-motion"

export const variants = {
    show: {
      y: 0,
      transition: {
        ease: "anticipate",
        duration: 0.4
      }
    },
    hide: {
      y: "100%",
      transition: {
        ease: "easeIn",
        duration: 0.2
      }
    },
    hidden: {
        opacity: 0,
        visibility:"hidden"
    },
    visible: {
        opacity: 1
    }
  };

export default function CartButton() {

    const modal = useRef()
    const cart = useContext(CartContext)

    return(
        <>
            <Modal ref={modal} />          

            <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{duration:0.1}} className="fixed bottom-0 left-0 right-0 flex flex-row items-center justify-between gap-6 px-6 py-3 mx-auto transition-all duration-200 cursor-pointer w-fit bg-base-100 rounded-t-xl hover:pb-5" onClick={() => modal.current.open()}>
                <h3 className="text-lg font-bold">SHOPPING CART</h3>
                <span className="px-2 py-1 bg-opacity-25 rounded-lg shadow-sm bg-base-100">${cart.totalPrice}</span>
            </motion.div>
            
        </>
    )
}