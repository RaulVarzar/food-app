import useFetch from "../hooks/useFetch"
import { useState } from "react"
import ProductsList from "./ProductsList"

const requestConfig = {
    method: "POST",
    headers: { 
        "Content-Type": "application/json"
    },
}

export default function ManageProducts() {

    const {
        fetchedData: products,
        categories: categories,
        sendRequest
      } = useFetch('products', requestConfig)

      function handleSubmit(event) {
        event.preventDefault()
        const fd = new FormData(event.target)
        const formData = Object.fromEntries(fd.entries())
        
        sendRequest(
            JSON.stringify({
                name: formData.name,
                price: formData.price,
                category: formData.category,
                description: formData.description,
            })
        )
    }

    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:3000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }



    return(
        <>
            <div className="flex flex-col gap-8 p-8 text-center">
                <h3 className="text-3xl font-bold uppercase">Products</h3>
                <div className="flex flex-col w-full gap-6">
                    {categories.map((category) => 
                        <ProductsList category={category} products={products}/>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit}>

                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                    <input type="text" name="name" id="name" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                    <label htmlFor="name" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                        Product Name
                    </label>
                </div>

                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                    <input type="text" name="price" id="price" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                    <label htmlFor="price" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                        Price
                    </label>
                </div>

                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                    <input type="text" name="category" id="category" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                    <label htmlFor="category" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                        Category
                    </label>
                </div>

                <div className="flex flex-col items-start w-full max-w-lg mx-auto my-2 input-with-placeholder ">
                    <input type="text" name="description" id="description" required className="w-full px-3 py-2 text-base font-medium text-center transition-all duration-300 bg-transparent border-b-2 outline-none border-opacity-20 focus:border-opacity-50 border-base-content text-base-content placeholder:opacity-40 "/>
                    <label htmlFor="description" className="z-50 mb-0 font-medium capitalize bg-opacity-0 bg-neutral-content">
                        Description
                    </label>
                </div>

                <button>SUBMIT</button>

            </form> 

    <form onSubmit={handleSubmit2}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
      {status && <h4>{status}</h4>}
        </>
    )
}