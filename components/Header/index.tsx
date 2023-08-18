import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext, useState } from 'react';
import ThemeContext, { THEME } from '../../context/ThemeContext';
import Burger from '../../public/images/burger.svg';
import MapIcon from '../../public/images/map-icon.svg';
import BasketHeader from '../BasketHeader';
import Input from '../Input';
import Search from '../Search';
import ThemeSwitcher from '../ThemeSwitcher';
import styles from './Header.module.scss';
import ToggleCity from './ToggleCity';

const navigation = [
  { id: 1, title: 'Главная', path: '/' },
  { id: 2, title: 'Галерея объектов', path: '/gallery' },
  { id: 3, title: 'Каталог', path: '/catalog' },
  { id: 4, title: 'О нас', path: '/about' },
  { id: 5, title: 'Новости', path: '/news' },
];

const otherPath = [{ id: 1, title: 'Корзина', path: '/basket' }];

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { pathname } = useRouter();
  const [visible, setVisible] = useState(false);

  const themeSwitcher = () => {
    toggleTheme();
    setVisible(false);
  };

  const activeNameTitle = () => {
    let activePath = navigation.find((item) => item.path === pathname);
    if (!activePath) {
      activePath = otherPath.find((item) => item.path === pathname);
    }
    return activePath?.title;
  };

  return (
    <>
      <span className={styles.toggleCityMobile}>
        <ToggleCity />
      </span>
      <header className={`${styles.header} ${styles[theme]}`}>
        <div className={styles.mobileMenuBtn}>
          <Burger onClick={() => setVisible(true)} />
        </div>
        <Link href={'/'}>
          <Image
            src={`${theme === THEME.DARK ? '/images/dark-logo.svg' : '/images/light-logo.svg'}`}
            width={262}
            height={126}
            alt="Logo"
            className={styles.Logo}
          />
        </Link>
        <div className={styles.navBarWrapper}>
          <Search />
          <nav>
            <ul className={`${styles.navBar} ${visible && styles.active}`}>
              <li className={styles.mobileMenuItem}>
                <Image
                  className={styles.menuArrow}
                  src={theme === THEME.DARK ? '/images/menu-arrow.svg' : '/images/white-menu-arrow.svg'}
                  alt="arrow"
                  width={32}
                  height={27.5}
                  onClick={() => setVisible(false)}
                />
                <Image
                  src={theme === THEME.DARK ? '/images/white-logo.svg' : '/images/blue-logo.svg'}
                  alt="logo"
                  width={68}
                  height={40.34}
                />
              </li>
              {navigation.map(({ id, title, path }) => (
                <li key={id}>
                  <Link
                    onClick={() => setVisible(false)}
                    className={pathname === path ? styles.active : ''}
                    href={path}
                  >
                    {title}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileMenuItem}>
                <Link onClick={() => setVisible(false)} href={'/basket'}>
                  Корзина
                </Link>
              </li>
              <li onClick={themeSwitcher} className={`${styles.mobileMenuItem} ${styles.switcher}`}>
                Сменить тему
              </li>
            </ul>
            <span className={styles.toggleCityDesktop}>
              <ToggleCity />
            </span>
          </nav>
          <div className={styles.mobilePageTitle}>
            <p>{activeNameTitle()}</p>
          </div>
        </div>
        <div className={styles.headerBasketBlock}>
          <div className={styles.themeSwitcher}>
            <ThemeSwitcher />
          </div>
          <div className={styles.basketWrapper}>
            <BasketHeader />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
