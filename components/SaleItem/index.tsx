import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext, useState } from 'react';
import { SaleItemType } from '../../@types/types';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import Button from '../Button';
import Grade from '../Grade';
import styles from './SaleItem.module.scss';

type SalesProps = {
  product: SaleItemType;
  percent: number;
};

const SaleItem: FC<SalesProps> = ({ product, percent }) => {
  const { addProduct, products, increaseProductQt, decreaseProductQt, setProductQt } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const [qtValue, setQtValue] = useState(products.get(product.id) || 0);

  return (
    <div className={`${styles.saleItem} ${styles[theme]}`} key={product.id}>
      <p className={styles.percent}>{percent}%</p>
      <div className={styles.saleItemImg}>
        <Image src={product.image.url} width={245} height={245} alt="product" />
        <p className={styles.ratingMobile}>
          <Grade clickable={false} value={product.rating} />
        </p>
      </div>
      <div className={styles.description}>
        <h3 onClick={() => router.push(`/product/${product.id}`)}>{product.name}</h3>
        <p onClick={() => router.push(`/catalog?cat=${product.category.id}`)} className={styles.category}>
          {product.category.name}
        </p>
        <p className={styles.rating}>
          <span>Оценка:</span>
          <Grade clickable={false} value={product.rating} />
        </p>
        <p className={styles.price}>
          <span>{product.price.active}₽</span>
          <span>{product.price.old}₽</span>
        </p>
        {!products.get(product.id) ? (
          <Button onClick={() => addProduct(product.id)} styleType="yellow">
            <span className={styles.desktopBtnText}>Добавить в корзину</span>
            <span className={styles.mobileBtnText}>В корзину</span>
          </Button>
        ) : (
          <div onClick={(e) => e.stopPropagation()} className={styles.quantity}>
            <button onClick={() => decreaseProductQt(product.id, product.measure.package)}>-</button>
            <span>
              <input
                type="number"
                min={0}
                onChange={(e) => setQtValue(e.target.value)}
                onBlur={(e) => setProductQt(product.id, qtValue)}
                value={qtValue}
              />
              <span>{product.measure.shorten}</span>
            </span>
            <button onClick={() => increaseProductQt(product.id, product.measure.package)}>+</button>
          </div>
        )}

        <span className={styles.basketLink}>
          {products.get(product.id) && <Link href={'/basket'}>Перейти в корзину</Link>}
        </span>
      </div>
    </div>
  );
};

export default SaleItem;
