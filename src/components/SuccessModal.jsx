import { forwardRef, useRef, useImperativeHandle,  } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"

const Modal = forwardRef (function Modal({}, ref) {

    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal()
            }
        }
    }) 

    function closeModal(){
        dialog.current.close()
    }

    return createPortal( 
        <dialog ref={dialog} className="text-center modal">

            <motion.div layout className="flex flex-row p-12 relative justify-center rounded-lg min-w-[300px] max-w-full transition-none duration-0 w-fit modal-box overflow-hidden">   
               <span className="text-2xl">ORDER SUCCESSFULLY SENT</span>
            </motion.div>

            <form method="dialog" className="h-screen modal-backdrop">
                <button onClick={closeModal}></button>
            </form>

      </dialog>,
      document.getElementById('modal-root')
    )
})

export default Modal