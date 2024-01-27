import {motion} from "framer-motion"
import style from "./Loading.module.css"

export default function Loading() {
    return(
        <motion.div exit={{opacity:0}} transition={{delay:0.8, duration:0.2}} className="absolute top-0 left-0 z-50 grid content-center w-full h-screen bg-base-300 place-content-center">
            <div className={style.body}>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
                <div className={style.dot}></div>
            </div>
        </motion.div>
    )
}