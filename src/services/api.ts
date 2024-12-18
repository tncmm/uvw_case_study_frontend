const BASE_URL="https://uvw-case-study-backend.onrender.com"
export async function apiFetch(url: string, options: RequestInit = {}) {
  
  const res = await fetch(`${BASE_URL}${url}`, {
    
    
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  console.log(`${process.env.API_URL}${url}`);
  
  const json = await res.json();
  
  if (!res.ok || json.isError) {
    const errorMsg = json.error?.message || 'API Error';
    throw new Error(errorMsg);
  }
  console.log(json);
  
  return json.data; // return the data property from the response
}
