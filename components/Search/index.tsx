import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { SearchResult } from '../../@types/types';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import SearchIcon from '../../public/images/search.svg';
import { searchProductsRequest } from '../../request';
import Input from '../Input';
import styles from './Search.module.scss';

const Search = () => {
  const { theme } = useContext(ThemeContext);
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  const { addProduct, products } = useContext(CartContext);

  const addToBasket = (event: MouseEvent<HTMLSpanElement>, id: number) => {
    event.preventDefault();
    addProduct(id);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLElement>(null);

  const [searchProducts, setSearchProducts] = useState<SearchResult[]>([]);

  const searching = (e: ChangeEvent<HTMLInputElement>) => {
    setActive(true);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (isActive) {
      if (searchValue === '') {
        setSearchProducts([]);
      }
      searchProductsRequest(searchValue, cancelToken)
        .then((result) => {
          setSearchProducts(result);
        })
        .catch(() => {});
      return () => cancelToken.cancel();
    }
    return () => cancelToken.cancel();
  }, [isActive, searchValue]);

  function SearchClick() {
    if (!isActive) {
      setActive(true);
      inputRef?.current?.focus();
      return true;
    }
    if (searchValue === '') {
      setActive(false);
      return true;
    }
    return true;
  }

  function handleShowAll(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setActive(false);
    setSearchProducts([]);
    router.push('/catalog?q=' + searchValue);
    setSearchValue('');
  }

  return (
    <div className={`${styles.search} ${styles[theme]} ${isActive && styles.active}`}>
      <Input
        value={searchValue}
        onChange={(e) => searching(e)}
        forwardedRef={inputRef}
        placeholder={'Поиск по каталогу'}
        type="text"
      />
      <span onClick={SearchClick} ref={searchRef} className={styles.searchIcon}>
        <SearchIcon />
      </span>
      <div className={`${styles.searchingProducts} ${searchProducts.length && styles.active}`}>
        <ul>
          {searchProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>
                <Image src={product.image.url} alt="" width={70} height={75} />
                <div className={styles.description}>
                  <h5>{product.name}</h5>
                  <p>{product.category.name}</p>
                  <div className={styles.productBottom}>
                    <span className={styles.price}>
                      <span>{product.price.old} ₽</span>
                      {product.price.active} ₽
                    </span>
                    {!products.has(product.id) && (
                      <button onClick={(e) => addToBasket(e, product.id)} className={styles.searchingBtn}>
                        В корзину
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.btnBlock}>
          <button onClick={handleShowAll} className={styles.searchingBtn}>
            Показать все
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
