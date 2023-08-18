import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { ANIMATION_DELAY } from '../../constants';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import Basket from '../../public/images/basket.svg';
import styles from './BasketHeader.module.scss';

const BasketHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { productsCount, init } = useContext(CartContext);
  const [animationCount, setAnimationCount] = useState(0);
  const [animateActive, setAnimateActive] = useState(false);
  useEffect(() => {
    if (init) {
      return;
    }
    if (productsCount - animationCount > 0) {
      setAnimateActive(true);
      const timeout = setTimeout(() => {
        setAnimateActive(false);
        setTimeout(() => {
          setAnimationCount(productsCount);
        }, ANIMATION_DELAY);
      }, ANIMATION_DELAY);
      return () => {
        clearTimeout(timeout);
      };
    }
    return;
  }, [animationCount, init, productsCount]);

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <Link className={`${styles.basket} ${productsCount > 0 && styles.active}`} href={'/basket'}>
        <Basket />
        {!!productsCount && <span>{productsCount}</span>}
      </Link>

      <div className={`${styles.animateBasket} ${animateActive && styles.active}`}>
        <Basket /> + {productsCount - animationCount}
      </div>
    </div>
  );
};

export default BasketHeader;
