import {jwtDecode} from 'jwt-decode';
export function setToken(token:string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      
    }
  }
  
  export async function getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return "";
  }
  
  export function clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  
  

interface TokenPayload {
  userId: string;
  role: string;
  exp: number;
  iat: number;
  
}

export function parseToken(){
  const token = localStorage.getItem('token');  
if (token) {
  const payload = jwtDecode<TokenPayload>(token);
  console.log(payload.userId, payload.role);
  return payload.userId
}
else{
  return ""
}
}

