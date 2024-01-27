
export default function CheckoutInput ({ onChange, value, type, name, children}) {
    return(
        <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
            <input value={value} onChange={onChange} type={type} name={name} id={name} required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
            <label htmlFor={name} className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                {children}
            </label>
        </div>
    )
}