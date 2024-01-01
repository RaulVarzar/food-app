import { useContext } from "react"
import CartContext from "../store/CartContext"
import { motion } from "framer-motion"

export default function CartItems({editable}) {
    const cart = useContext(CartContext)

    return(
        <motion.ul className="flex flex-col items-center gap-1 px-10 mt-4">
            {cart.cartItems.map((item) => 
                 <li key={item.id} className="flex flex-row items-center justify-between w-full max-w-lg gap-10 px-8 py-2 transition duration-300 bg-opacity-20 rounded-xl bg-base-100">
                    <div className="flex flex-col text-left">
                        <h3 className="font-semibold text-md md:text-xl">{item.name}</h3>
                        <span className="text-xs md:text-sm opacity-70">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        {editable && <button className="hover:btn-accent btn btn-round btn-sm btn-neutral" onClick={() => cart.removeItem(item)}><i className="fa-solid fa-minus"></i></button>}
                        <span className="text-lg font-semibold">{item.quantity}</span>
                        {editable && <button className="hover:btn-accent btn btn-round btn-sm btn-neutral" onClick={() => cart.addToCart(item)}><i className="fa-solid fa-plus"></i></button> }
                    </div>
                </li>
            )}
        </motion.ul>
    )
}