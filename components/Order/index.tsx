import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import Popup from '../Popup';
import styles from './Order.module.scss';

type OrderType = {
  id: number;
  name: string;
  type: string;
};

const orderList: OrderType[] = [
  { id: 0, name: 'Новые', type: 'new' },
  { id: 1, name: 'Сначала дешевые', type: 'price-low' },
  { id: 2, name: 'Сначала дорогие', type: 'price-high' },
  { id: 3, name: 'С высоким рейтингом', type: 'rating-high' },
];

const Order = () => {
  const { theme } = useContext(ThemeContext);
  const [order, setOrder] = useState(orderList[0]);
  const [popupActive, setPopupActive] = useState<boolean>(false);

  const router = useRouter();

  const handleOrder = (item: OrderType) => {
    setPopupActive(!popupActive);
    setOrder(item);
    const { query } = router;
    router.push({ query: { ...query, order: item.type } });
  };

  return (
    <div className={`${styles.order} ${theme && styles[theme]}`}>
      <Popup active={popupActive} onChangeActive={setPopupActive} preview={order.name}>
        {orderList.map((item) => (
          <li key={item.id} onClick={() => handleOrder(item)}>
            {item.name}
          </li>
        ))}
      </Popup>
    </div>
  );
};

export default Order;
