import React, { FC, useContext, useEffect } from 'react';
import ThemeContext from '../../context/ThemeContext';
import { CartItem } from '../../pages/basket';
import Arrow from '../../public/images/modal-arrow.svg';
import styles from './Checkout.module.scss';
import CheckoutForm from './CheckoutForm';
import SelectedProducts from './SelectedProducts';

interface CheckoutProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: CartItem[];
  selectedProducts: number[];
  setSelectedProducts: (value: any) => void;
}

const Checkout: FC<CheckoutProps> = ({ isOpen, setIsOpen, data, selectedProducts, setSelectedProducts }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.body.classList.add(styles['modal-open']);
      return;
    }
    document.body.classList.remove(styles['modal-open']);
  }, [isOpen]);

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`${styles.wrapper} ${isOpen && styles.active} ${theme && styles[theme]}`}
    >
      <div onClick={(event) => event.stopPropagation()} className={styles.checkout}>
        <Arrow onClick={() => setIsOpen(false)} className={styles.arrow} />
        <h2>Оформление заказа</h2>
        <div className={styles.content}>
          <CheckoutForm data={data} closeModal={() => setIsOpen(false)} />
          <SelectedProducts data={data} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
