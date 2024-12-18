import { apiFetch } from './api';
import { getToken } from '@/utils/token';

const token = getToken();

export async function fetchUserById(id: string) {
    console.log(id);
    
  return await apiFetch(`/user/${id}`, {
    headers: {
      "x-auth-token": token ?? "",
    },
  });
}

export async function updateUser(id: string, data: any) {
  return await apiFetch(`/user/${id}`, {
    method: 'PUT',
    headers: {
      "x-auth-token": token ?? "",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: string) {
  return await apiFetch(`/user/${id}`, {
    method: 'DELETE',
    headers: {
      "x-auth-token": token ?? "",
    },
  });
}
