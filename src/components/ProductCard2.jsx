import { useContext } from "react"

import { motion } from "framer-motion"
import CartContext from "../store/CartContext"

export default function Product({meal, index}) {

    const cart = useContext(CartContext)

    return(
            <motion.div 
                initial={{opacity:0}} 
                animate={{opacity:1, transition:{delay: 0.2 + (index * 0.2)}}} 
                exit={{opacity:0, transition:{duration:0.2}}} 
                whileHover={{scale:1.01, transition:{duration:0.15, ease: "easeIn"}}} 
                className="relative flex flex-col items-center content-center justify-between max-w-xs lg:max-w-6xl p-2.5 pb-4 overflow-hidden rounded-lg shadow-md bg-base-200" 
            >
                    <div className="flex flex-col gap-1.5">
                        <img src={`http://localhost:3000/${meal.image}`} alt="individual-meal"  className='w-full h-auto rounded-lg'/>
                        <div className='flex flex-col gap-1 px-2 py-2 border-base-100'>
                            <h3 className='text-xl font-semibold tracking-wide uppercase text-slate-200'>{meal.name}</h3>
                            <span className='text-sm font-light leading-none tracking-wide opacity-40 text-neutral-content'>{meal.description}</span>
                        </div>
                    </div>

                    <div className="relative flex flex-row items-center justify-between w-full gap-6 px-2 text-center cursor-pointer">
                        <span className="px-2 text-xl font-bold tracking-wide text-accent opacity-80">${meal.price}</span>
                        <button className="px-4 py-1.5 hover:scale-103 rounded-lg shadow-sm gap-2 items-center transition duration-300 flex bg-base-content bg-opacity-5 btn-neutral btn-ghost" onClick={() => cart.addToCart(meal)}>
                            Add to cart
                            <i className="text-lg text-gray-300 transition duration-300 fa-solid fa-cart-plus group-hover:scale-105 group-hover:text-accent"></i> 
                        </button>
                    </div>

            </motion.div> 
    )
}