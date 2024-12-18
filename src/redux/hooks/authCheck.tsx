import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUserState } from '../slices/authSlice'; // Adjust the import path as needed
import { RootState } from '../store';
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
          // Assuming you have a function to parse the token and get userId
          const userId = parseToken(); 
          
          // Dispatch action to fetch user by ID
          const fetchedUser = await dispatch(getUserById(userId??"")).unwrap();
          
          // Update auth state
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
       // router.replace("/auth/login");
      }
    };

    // Run auth check on initial load and when route changes
    checkAuth();
  }, [dispatch, router, user]);

  return { user, token };
};



import { ComponentType } from 'react';
import { parseToken } from '@/utils/token';

export const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user } = useAuthCheck();

    // If no user is authenticated, the useAuthCheck hook will handle redirection
    if (!user) {
      return null; // Render nothing while redirecting
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};