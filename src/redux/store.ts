/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    user: userReducer,

  },
 
});



const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  return configureStore(state);
};

export default rootReducer;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
