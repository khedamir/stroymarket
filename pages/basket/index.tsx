import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import useSWR from 'swr';
import { ImageType, Measure, PriceType, Property } from '../../@types/types';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Checkout from '../../components/Checkout';
import Popup from '../../components/Popup';
import { CART_API_URL } from '../../constants';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import DeleteMob from '../../public/images/delete-mob.svg';
import Delete from '../../public/images/delete.svg';
import styles from './Basket.module.scss';
import Loader from '../../components/loader';

const fetcher = (url: string, config: any) => {
  return axios.get(url, config).then((res: AxiosResponse<any>) => res.data);
};
const getRequestParams = (products: Map<number, number>) => {
  return {
    params: {
      items: Array.from(products).map(([id]) => id) || [],
    },
  };
};
export type CartItem = {
  id: number;
  name: string;
  properties: Property[];
  price: PriceType;
  image: ImageType;
  measure: Measure;
};
const Basket = () => {
  const { theme } = useContext(ThemeContext);
  const { products, removeProduct } = useContext(CartContext);
  const { data, error, isLoading } = useSWR(
    { url: CART_API_URL, config: getRequestParams(products) },
    ({ url, config }) => fetcher(url, config)
  );
  const [selectedProduct, setSelectedProduct] = useState<number[]>(Array.from(products.keys()));
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectedProducts = (id: number) => {
    const selectedIndex = selectedProduct.findIndex((v) => v === id);
    if (selectedIndex === -1) {
      setSelectedProduct((prev) => [...prev, id]);
    } else {
      setSelectedProduct((prev) => prev.filter((v) => v !== id));
    }
  };
  if (error) {
    return (
      <div className={`${styles.wrapper} ${styles[theme]}`}>
        <p className={styles.message}>Товары в корзине отсутствуют...</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={`${styles.wrapper} ${styles[theme]}`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <Checkout
        data={data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedProducts={setSelectedProduct}
        selectedProducts={selectedProduct}
      />
      <div className={`${styles.basket} ${styles[theme]}`}>
        <nav className={styles.productListHeader}>
          <span>Выбрано {selectedProduct.length}</span>
          <span>Название</span>
          <span>Количество</span>
          <span>Цена</span>
        </nav>
        <div className={styles.productsList}>
          {data.map((item: CartItem) => (
            <div key={item.id} className={styles.productWrapper}>
              <span className={styles.productCheckbox}>
                <Checkbox
                  checked={!!selectedProduct.find((v) => v === item.id)}
                  onChange={() => handleSelectedProducts(item.id)}
                  id={item.name}
                />
                <label htmlFor={item.name}></label>
              </span>

              <div className={styles.productItem}>
                {!selectedProduct.find((v) => v === item.id) ? (
                  <p className={styles.selectStatus}>Не выбрано</p>
                ) : (
                  <p className={styles.selectStatus}>Выбрано</p>
                )}
                <div className={styles.productDescription}>
                  <Image src={item.image.url} width={195} height={142} alt="product" />

                  <div className={styles.productName}>
                    <Link href={`/product/${item.id}`}>
                      <h2>{item.name}</h2>
                    </Link>
                    <Popup preview="Характеристики">
                      {item.properties.map((prop: Property) => (
                        <li className={styles.descriptionItems} key={prop.id}>
                          <span>{prop.name}</span>
                          <span>{prop.value}</span>
                        </li>
                      ))}
                    </Popup>
                  </div>
                  <div className={styles.productPrice}>
                    <span>
                      {products.get(item.id)}
                      {item.measure.shorten}
                    </span>
                    <span>{(item.price.active * products.get(item.id)).toFixed(1)} ₽</span>
                    <Delete onClick={() => removeProduct(item.id)} className={styles.deleteButton} />
                    <DeleteMob onClick={() => removeProduct(item.id)} className={styles.deleteMobButton} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.checkout}>
            <Button onClick={() => setIsOpen(true)} disabled={selectedProduct.length === 0} styleType="blue">
              Оформить заказ
            </Button>
            {selectedProduct.length === 0 && <span>Выберете товары которые хотите заказать</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Basket;
