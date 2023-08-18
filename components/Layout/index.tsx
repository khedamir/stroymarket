import { useRouter } from 'next/router';
import { FC, ReactNode, useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import Footer from '../Footer';
import Header from '../Header';
import styles from './Layout.module.scss';

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { pathname } = useRouter();
  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      {pathname !== '/privacy-policy' && pathname !== '/legal' && <Header />}
      {children}
      {pathname !== '/privacy-policy' && pathname !== '/legal' && <Footer />}
    </div>
  );
};

export default Layout;
