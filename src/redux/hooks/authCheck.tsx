import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setUserState } from '../slices/authSlice'; 
import { getUserById } from '../slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user= useAppSelector((state)=>state.auth.user)
  const token= useAppSelector((state)=>state.auth.token)

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!user && storedToken) {
        try {
          const userId = parseToken(); 
          
          const fetchedUser = await dispatch(getUserById(userId??"")).unwrap();
          
          dispatch(setUserState({
            user: {
              id: fetchedUser.id,
              email: fetchedUser.email,
              name: fetchedUser.name,
              surname: fetchedUser.surname,
              phoneNumber: fetchedUser.phoneNumber
            },
            token: storedToken
          }));
        } catch (err) {
          console.error('Failed to fetch user data:', err);
    
        }
      } else if (!storedToken) {
      }
    };

    checkAuth();
  }, [dispatch, router, user]);

  return { user, token };
};



import { ComponentType } from 'react';
import { parseToken } from '@/utils/token';

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user } = useAuthCheck();

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};