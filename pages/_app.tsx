import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { CartContextProvider } from '../context/CartContext';
import { ThemeContextProvider } from '../context/ThemeContext';
import '../styles/globals.scss';
import '../styles/swiper.scss';

const Layout = dynamic(() => import('../components/Layout'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <ThemeContextProvider>
        <Layout>
          <main className="main">
            <Component {...pageProps} />
          </main>
        </Layout>
      </ThemeContextProvider>
    </CartContextProvider>
  );
}
