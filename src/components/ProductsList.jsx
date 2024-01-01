export default function ProductsList({category, products}) {

    const filtered = products.filter( (product) => product.category === category)

    return(
        <div className="flex flex-col justify-start gap-2 text-left">
            <h3 className="text-2xl font-bold uppercase">{category}</h3>
            <div className="flex flex-row flex-wrap gap-3">
                {filtered.map((product) => 
                    <div className="flex flex-row items-center justify-center gap-4 px-6 py-4 rounded-lg bg-base-300 min-w-fit"> 
                        <div className="flex flex-col">
                            <h3 className="text-xl font-semibold">{product.name}</h3> 
                            <span>Price: {product.price}</span>
                        </div>
                        <button className="btn btn-ghost btn-sm"><i className="fa-solid fa-pen-to-square"></i></button>
                    </div>
                )}
            </div>
        </div>
    )
}