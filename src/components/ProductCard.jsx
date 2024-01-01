import { useContext } from "react"

import { motion } from "framer-motion"
import CartContext from "../store/CartContext"

export default function Meal({meal, index}) {

    const cart = useContext(CartContext)

    return(
        // <AnimatePresence mode="wait">    
            <motion.div 
                initial={{opacity:0}} 
                animate={{opacity:1, transition:{delay: 0.2 + (index * 0.2)}}} 
                exit={{opacity:0, transition:{duration:0.2}}} 
                whileHover={{scale:1.01, transition:{duration:0.15, ease: "easeIn"}}} 
                className="relative flex flex-col items-center content-center max-w-md overflow-hidden rounded-lg shadow-xl bg-base-300" 
            >
                <img src={`http://localhost:3000/${meal.image}`} alt="individual-meal"  className='w-full h-auto'/>
                <span className='absolute px-3 py-1.5 text-md font-semibold outline outline-[5px] outline-base-100  rounded-es-lg top-0 right-0 bg-accent text-slate-800'>${meal.price}</span>

                <div className="flex flex-row items-center content-center px-2 py-4">

                    <div className='flex flex-col gap-1 pl-4 pr-1 border-r-2 border-base-100'>
                        <h3 className='text-xl font-semibold tracking-wide uppercase text-slate-200'>{meal.name}</h3>
                        <span className='text-sm leading-none text-neutral-content opacity-60'>{meal.description}</span>
                    </div>
                    <div className="grid items-center h-full px-4 text-center cursor-pointer place-content-center group" onClick={() => cart.addToCart(meal)}>
                        <i className="text-3xl text-gray-300 transition duration-300 fa-solid fa-cart-plus group-hover:scale-105 group-hover:text-accent"></i> 
                </div>
                </div>
            </motion.div> 
        // </AnimatePresence>
    )
}