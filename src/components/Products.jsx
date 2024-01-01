import {motion, AnimatePresence} from "framer-motion"
import Product from './ProductCard2.jsx';

export default function Products({products, activeTab}) {

    const filteredMeals = products.filter( (meal) => meal.category === activeTab)

    return(
        <motion.div layout initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
        className="grid grid-cols-1 gap-3 px-4 pb-16 mx-auto max-w-[1400px] lg:gap-4 sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 ">
          <AnimatePresence mode="wait">
            {filteredMeals.map((meal, i) => 
              <Product key={meal.id} meal={meal} index={i}/>
            )}
          </AnimatePresence>
        </motion.div>
    )
}