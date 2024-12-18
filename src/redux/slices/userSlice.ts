/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserById, updateUser, deleteUser } from '../../services/userService';

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  currentUser: User | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
};

export const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
  return await fetchUserById(id);
});

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ id, data }: { id: string; data: any }) => {
    return await updateUser(id, data);
  }
);

export const removeUser = createAsyncThunk('user/removeUser', async (id: string) => {
  await deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'idle';
      })
      .addCase(getUserById.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
