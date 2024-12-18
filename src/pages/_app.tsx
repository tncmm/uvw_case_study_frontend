import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useAuthCheck } from '@/redux/hooks/authCheck';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noNavbarPages = ["/auth/login", "/auth/register"];
  


  return (
    <Provider store={store}>
      
        {/* Conditionally render Navbar */}
        {!noNavbarPages.includes(router.pathname) && <Navbar />}
        
        <Component {...pageProps} />
      
    </Provider>
  );
}

export default MyApp;