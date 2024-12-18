import { getToken } from '@/utils/token';
import { apiFetch } from './api';
var token = getToken();

export async function fetchPosts(params?:any) {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return await apiFetch(`/post${query}`,{
    headers: {
      "x-auth-token": token??""
    },
  });
}

export async function fetchPostById(id:string) {
  return await apiFetch(`/post/${id}`,{
    headers: {
      "x-auth-token": token??""
    },
  });
}

export async function fetchPostsByUser(userId:string) {
  
  return await apiFetch(`/post/user/${userId}`,{
    headers: {
      "x-auth-token": token??""
    },
  });
}

export async function createPost(data:any) {
  
  
  const response= await apiFetch('/post', {
    method: 'POST',
    headers: {
      "x-auth-token": token??""
    },
    body: JSON.stringify(data)
  });
  return response
}

export async function updatePost(id:string, data:any) {
  return await apiFetch(`/post/${id}`, {
    method: 'PUT',
    headers: {
      "x-auth-token": token??""
    },
    body: JSON.stringify(data)
  });
}

export async function deletePost(id:string) {
  await apiFetch(`/post/${id}`, {
    method: 'DELETE',
    headers: {
      "x-auth-token": token??""
    },
  });
}
