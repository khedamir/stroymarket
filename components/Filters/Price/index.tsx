import React, { FC, useContext, useState } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import { CatalogQueryParams } from '../../../request';
import Checkbox from '../../Checkbox';
import Popup from '../../Popup';
import styles from './Price.module.scss';

interface PriceProps {
  query: CatalogQueryParams;
  filter: () => void;
}

const Price: FC<PriceProps> = ({ query, filter }) => {
  const { theme } = useContext(ThemeContext);
  const [price, setPrice] = useState({ min: query.price?.min ?? 0, max: query.price?.max ?? 0 });
  const [newest, setNewest] = useState(query.newest ?? false);
  const [onSale, setOnSale] = useState(query.onSale ?? false);

  const handleMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!query.price) {
      query.price = {
        min: price.min,
        max: price.max,
      };
    }
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      delete query.price;
      setPrice({ ...price, min: 0 });
      return;
    }
    const newPrice = { ...price, min: value };
    if (value > price.max) {
      newPrice.max = value;
    }
    setPrice(newPrice);
    query.price.min = value;
    query.price.max = value;
    filter();
    return;
  };

  const handleMaxPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!query.price) {
      query.price = {
        min: price.min,
        max: price.max,
      };
    }
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      delete query.price;
      setPrice({ ...price, max: 0 });
      return;
    }
    setPrice({ ...price, max: value });
    query.price.max = value;
    filter();
  };

  const handleNewest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewest(event.target.checked);
    query.newest = event.target.checked;
    if (!event.target.checked) {
      delete query.newest;
    }
    filter();
  };

  const handleOnSale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnSale(event.target.checked);
    query.onSale = event.target.checked;
    if (!event.target.checked) {
      delete query.onSale;
    }
    filter();
  };

  return (
    <Popup
      preview={
        (price.min && !isNaN(price.min)) || (price.max && !isNaN(price.max))
          ? `${price.min} ₽ - ${price.max} ₽`
          : newest
          ? 'Новинки'
          : onSale
          ? 'Со скидкой'
          : 'Цена'
      }
    >
      <li className={`${styles.price} ${theme && styles[theme]}`}>
        <label className={styles.minmaxPrice}>
          {' '}
          <input value={price.min ? price.min : ''} placeholder="от" min={0} onChange={handleMinPrice} type="number" />
          <span>₽</span>
        </label>
        <label>
          <input
            value={price.max ? price.max : ''}
            placeholder="до"
            min={price.min}
            onChange={handleMaxPrice}
            type="number"
          />
          <span>₽</span>
        </label>
      </li>
      <li>
        <Checkbox type="checkbox" id="newest" checked={newest} onChange={handleNewest} />
        <label htmlFor="newest">Новинки</label>
      </li>
      <li>
        <Checkbox type="checkbox" id="sales" checked={onSale} onChange={handleOnSale} />
        <label htmlFor="sales">Со скидкой</label>
      </li>
    </Popup>
  );
};

export default Price;
