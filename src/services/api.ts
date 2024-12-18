
export async function apiFetch(url: string, options: RequestInit = {}) {
  
  const res = await fetch(`${process.env.API_URL}${url}`, {
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
