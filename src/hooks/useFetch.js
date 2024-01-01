import { useCallback, useEffect, useState } from "react";
import { fetchData } from "../http";

function getCategories(array) {
  let filteredProducts = []
  array.forEach(product => {
      if (!filteredProducts.includes(product.category)) {
          filteredProducts.push(product.category)
      }
  })
  return filteredProducts
}

export default function useFetch( url, config) {
  
    const [isFetching, setIsFetching] = useState()
    const [error, setError] = useState()
    const [fetchedData, setFetchedData] = useState([])
    const [categories, setCategories] = useState([])

    const sendRequest = useCallback(
        async function sendRequest(data) { 
          setIsFetching(true);
          try {
            const resData = await fetchData(url, {...config, body: data});
            setFetchedData(resData);
            setCategories(getCategories(resData))
          } catch (error) {
            setError({ message: error.message || 'Failed to fetch data.' });
          }
          setIsFetching(false);
        }, 
        [url, config]
      );

      useEffect(() => {
        if((config && (config.method === "GET" || !config.method)) || !config) {
          sendRequest()
        }
      }, [sendRequest, config]);
    
    return{ isFetching, error, fetchedData, categories, sendRequest}
}