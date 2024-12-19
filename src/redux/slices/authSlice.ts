import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register as registerUser } from '../../services/authService';
import{ fetchUserById} from '../../services/userService'
import { setToken, clearToken, getToken } from '../../utils/token';

interface User {
  id?: string;
  email?: string;
  name: string;
  surname: string;
  phoneNumber: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: null,
  token:await getToken(),
  status: 'idle',
};

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (id, { rejectWithValue }) => {
    try {
      const userProfile = await fetchUserById(id??"");
      return userProfile;
    } catch (error) {
      clearToken();
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
  const data = await login(credentials);
  return data; 
});

export const register = createAsyncThunk('auth/register', async (credentials: unknown) => {
  const data = await registerUser(credentials);
  return data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      clearToken();
      localStorage.removeItem('userInfo');
    },
    setUserState(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setToken(action.payload.token);
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
    },
    loadUserFromStorage(state) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        state.user = JSON.parse(storedUserInfo);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        const userInfo = { 
          id: action.payload.userId, 
          email: action.payload.email, 
          name: action.payload.name, 
          surname: action.payload.surname,
          phoneNumber: action.payload.phone
        };
        state.user = userInfo;
        setToken(action.payload.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        state.status = 'idle';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        const userInfo = { 
          id: action.payload.userId, 
          email: action.payload.email, 
          name: action.payload.name, 
          surname: action.payload.surname,
          phoneNumber: action.payload.phone
        };
        state.user = userInfo;
        setToken(action.payload.token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        state.status = 'idle';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        clearToken();
        localStorage.removeItem('userInfo');
      });
  }
});

export const { logout, setUserState, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;