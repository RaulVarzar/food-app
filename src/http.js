export async function fetchData(url, config) {
    const response = await fetch(`http://localhost:3000/${url}`, config);
    const resData = await response.json();
   
    if (!response.ok) {
      throw new Error('Failed to load data.');
    }
    
    return resData;
  }
