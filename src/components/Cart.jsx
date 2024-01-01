import CartItems from "./CartItems"
import { FadeIn, FromTop } from "../utils/animations"
import { motion } from "framer-motion"
import { useContext } from "react"
import CartContext from "../store/CartContext"

export default function Cart({openCheckout, setOpenCheckout}) {

    const cart = useContext(CartContext)
    const notEmpty = cart.totalPrice > 0

    return(
        <motion.div layout className="flex flex-col justify-between gap-2 py-4 ">
            {!openCheckout && <FromTop delay={0.1}><motion.h3 layout="position" className="text-2xl font-bold">SHOPPING CART</motion.h3></FromTop>}
            
            <motion.div layout="position">
                <CartItems editable={!openCheckout}/>
            </motion.div>

            <motion.div layout="position" className="flex flex-col">
            {openCheckout && <FadeIn><h3 className="opacity-60">TOTAL</h3> </FadeIn>}
            { !notEmpty 
                ? <span className="text-lg italic opacity-60">No items in the cart.</span>
                : <span className="text-2xl font-bold">${cart.totalPrice}</span>
            }
            </motion.div>

            {!openCheckout && notEmpty &&
                <FadeIn delay={0}>
                    <div className="flex mx-auto mt-2 gap-x-4 w-fit">
                        <button className="text-sm font-bold uppercase btn btn-ghost hover:text-error" onClick={() => cart.emptyCart()}>
                            Empty cart
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <button className="text-sm font-bold uppercase btn btn-neural hover:btn-accent" onClick={() => setOpenCheckout()}>
                            CHECKOUT
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                </FadeIn>
            }
        </motion.div>
    )
}