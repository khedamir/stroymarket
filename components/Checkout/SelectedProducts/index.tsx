import React, { FC, useContext, useState } from 'react';
import CartContext from '../../../context/CartContext';
import ThemeContext from '../../../context/ThemeContext';
import { CartItem } from '../../../pages/basket';
import Basket from '../../../public/images/modalBasket.svg';
import styles from './SelectedProducts.module.scss';

interface SelectedProductsProps {
  selectedProducts: number[];
  setSelectedProducts: (value: any) => void;
  data: any;
}

const SelectedProducts: FC<SelectedProductsProps> = ({ data, selectedProducts, setSelectedProducts }) => {
  const { products } = useContext(CartContext);
  const [removedProducts, setRemovedProducts] = useState<Map<number, NodeJS.Timeout>>(new Map());
  const { theme } = useContext(ThemeContext);

  function deleteProduct(id: number) {
    if (removedProducts.has(id)) {
      clearTimeout(removedProducts.get(id));
      const newRemovedProducts = new Map(removedProducts);
      newRemovedProducts.delete(id);
      setSelectedProducts((prev: number[]) => prev.filter((v) => v !== id));
      setRemovedProducts(newRemovedProducts);
    }
  }

  const removeSelectedItem = (id: number) => {
    const newRemovedProducts = new Map(removedProducts);
    newRemovedProducts.set(
      id,
      setTimeout(() => {
        setSelectedProducts((prev: number[]) => prev.filter((v) => v !== id));
      }, 3000)
    );
    setRemovedProducts(newRemovedProducts);
  };

  const returnSelectedItem = (id: number) => {
    if (removedProducts.has(id)) {
      clearTimeout(removedProducts.get(id));
      const newRemovedProducts = new Map(removedProducts);
      newRemovedProducts.delete(id);
      setRemovedProducts(newRemovedProducts);
    }
  };

  return (
    <div className={`${styles.selectedProducts} ${styles[theme]}`}>
      {data.map((item: CartItem) => {
        return selectedProducts.find((v) => v === item.id) ? (
          <div key={item.id}>
            {!removedProducts.has(item.id) ? (
              <div className={styles.selectedProductItem}>
                <p>{item.name}</p>
                <div>
                  <span>
                    {products.get(item.id)}
                    {item.measure.shorten}
                  </span>
                  <span>{item.price.active}₽</span>
                  <Basket className={styles.deleteIcon} onClick={() => removeSelectedItem(item.id)} />
                </div>
              </div>
            ) : (
              <div className={styles.returnRemoveItem}>
                <span>Товар был удален из выбранных</span>
                <span onClick={() => returnSelectedItem(item.id)}>Вернуть</span>
              </div>
            )}
          </div>
        ) : (
          ''
        );
      })}
    </div>
  );
};

export default SelectedProducts;
