/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiFetch } from './api';

export async function login({email, password}:{email:string;password:string}) {
  return await apiFetch('/authentication/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function register(credentials:any) {
  return await apiFetch('/authentication/register', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
}
