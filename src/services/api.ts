const BASE_URL = "http://localhost:3001";

export async function apiFetch(url: string, options: RequestInit = {}) {
  console.log(`${BASE_URL}${url}`);
  
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  console.log(res);
  
  const json = await res.json();
  
  if (!res.ok || json.isError) {
    const errorMsg = json.error?.message || 'API Error';
    throw new Error(errorMsg);
  }
  console.log(json);
  
  return json.data; // return the data property from the response
}
