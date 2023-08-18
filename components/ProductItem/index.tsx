import Image from 'next/image';
import Link from 'next/link';
import React, { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { ProductListType } from '../../@types/types';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import Basket from '../../public/images/basket-catalog.svg';
import Button from '../Button';
import styles from './ProductItem.module.scss';

interface ProductItemProps {
  product: ProductListType;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const { addProduct, products, increaseProductQt, decreaseProductQt, setProductQt } = useContext(CartContext);
  const [qtValue, setQtValue] = useState(products.get(product.id) || 0);
  const addToBasket = (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    addProduct(product.id);
  };
  useEffect(() => {
    setQtValue(products.get(product.id));
  }, [products, product.id]);

  return (
    <div itemScope className={`${styles.productItem} ${styles[theme]}`}>
      <Link href={`/product/${product.id}`} className={styles.productTop} key={product.id}>
        {product.sale && (
          <span className={styles.rating}>
            <span className={styles.squery}></span>
            <span className={styles.ratingPercent}>%</span>
          </span>
        )}
        <Image src={product.image.url} width={300} height={194} alt={'product'} />
        <div className={styles.description}>
          <h3 itemProp={'name'}>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </Link>
      <div className={styles.productBottom}>
        <span className={styles.price}>
          {product.price.active}₽ {product.price.old && <span>{product.price.old}₽</span>}
        </span>

        {!products.get(product.id) ? (
          <Button onClick={addToBasket} styleType={'yellow'}>
            <span>В корзину</span>
            <Basket />
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

        <span onClick={(e) => e.stopPropagation()} className={styles.basketLink}>
          {products.get(product.id) && <Link href={'/basket'}>Перейти в корзину</Link>}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
