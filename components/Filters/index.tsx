import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { FiltersType } from '../../@types/types';
import ThemeContext from '../../context/ThemeContext';
import FilterIcon from '../../public/images/filters.svg';
import { CatalogQueryParams } from '../../request';
import Order from '../Order';
import Popup from '../Popup';
import styles from './Filters.module.scss';
import Price from './Price';
import Properties from './Properties';

interface FiltersProps {
  filters: FiltersType;
  query: CatalogQueryParams;
  filter: () => void;
}

const Filters: FC<FiltersProps> = ({ filters, query, filter }) => {
  const { theme } = useContext(ThemeContext);
  const [isClosing, setIsClosing] = useState(true);
  const { manufacturers, properties, categories } = filters;

  const handleManufacturersChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      if (query.man === undefined) {
        query.man = id.toString();
        filter();
        return;
      }
      const current = query.man.split(',').map((id) => parseInt(id));
      current.push(id);
      query.man = current.join(',');
      filter();
      return;
    }
    if (query.man !== undefined) {
      const current = query.man.split(',').map((id) => parseInt(id));
      current.splice(current.indexOf(id), 1);
      if (current.length === 0) {
        delete query.man;
        filter();
        return;
      }
      query.man = current.join(',');
      filter();
      return;
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      if (query.cat === undefined) {
        query.cat = id.toString();
        filter();
        return;
      }
      const current = query.cat.split(',').map((id) => parseInt(id));
      current.push(id);
      query.cat = current.join(',');
      filter();
      return;
    }
    if (query.cat !== undefined) {
      const current = query.cat.split(',').map((id) => parseInt(id));
      current.splice(current.indexOf(id), 1);
      if (current.length === 0) {
        delete query.cat;
        filter();
        return;
      }
      query.cat = current.join(',');
      filter();
      return;
    }
  };

  return (
    <header className={`${styles.header} ${isClosing && styles.closing}`}>
      <Order />
      <div className={`${styles.wrapper} ${theme && styles[theme]}`}>
        <h3 onClick={() => setIsClosing(!isClosing)}>
          <FilterIcon />
          Фильтр
        </h3>
        <div className={styles.filters}>
          <Price filter={filter} query={query} />
          <Popup
            preview={'Производители'}
            selectedItems={query.man?.split(',').map((id) => parseInt(id))}
            lists={manufacturers}
            onChange={(event: ChangeEvent<HTMLInputElement>, id) => handleManufacturersChange(event, id)}
          />

          <Popup
            preview={'Категории'}
            selectedItems={query.cat?.split(',').map((id) => parseInt(id))}
            lists={categories}
            onChange={(event: ChangeEvent<HTMLInputElement>, id) => handleCategoryChange(event, id)}
          />

          <Properties query={query} filter={filter} properties={properties} />
        </div>
      </div>
    </header>
  );
};

export default Filters;
