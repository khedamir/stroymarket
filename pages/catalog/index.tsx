import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { FiltersType, Products } from '../../@types/types';
import Filters from '../../components/Filters';
import Loader from '../../components/loader';
import Pagination from '../../components/Pagination';
import ProductItem from '../../components/ProductItem';
import { CatalogQueryParams, getProductsRequest } from '../../request';
import styles from './Catalog.module.scss';

interface CatalogProps {
  products: Products;
  filters: FiltersType;
}

const parseQuery = ({ query }: NextRouter): CatalogQueryParams => {
  const output: CatalogQueryParams = {
    order: query.order ? (query.order as string) : 'new',
  };
  if (query) {
    if (query.q) {
      output.q = query.q as string;
    }
    if (query.cat) {
      output.cat = query.cat as string;
    }
    if (query.man) {
      output.man = query.man as string;
    }
    if (query.props) {
      output.props = query.props as string;
    }
    if (query.page) {
      output.page = parseInt(query.page as string);
    }
    // if (query.price) {
    //   output.price.min = parseInt(query.pri as string);
    // }
    // price?: {
    //   min?: number;
    //   max?: number;
    // };
    if (query.price) {
      output.price = JSON.parse(query.price as string);
    }
    if (query.newest) {
      output.newest = true;
    }
    if (query.onSale) {
      output.onSale = true;
    }
  }

  return output;
};
const Catalog = ({ products, filters }: CatalogProps) => {
  const [productsState, setProductsState] = useState(products);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const currentQuery = useRef(parseQuery(router));
  const updateHref = () => {
    setIsUpdating(true);
    getProductsRequest(currentQuery.current).then((response) => {
      setProductsState(response);
      setIsUpdating(false);
    });
    const url = new URL(router.asPath, location.protocol + '//' + location.host);
    Object.keys(currentQuery.current).forEach((key: string, index) => {
      // @ts-ignore
      let param = currentQuery.current[key];
      if (typeof param === 'object') {
        param = JSON.stringify(param);
      }
      url.searchParams.set(key, param);
    });

    const decoded = decodeURI(url.toString());
    history.pushState(currentQuery.current, '', decoded);
  };
  const paginate = (page: number) => {
    currentQuery.current.page = page;
    updateHref();
  };
  const filter = () => {
    updateHref();
  };
  return (
    <div className={styles.catalog}>
      <Head>
        <meta name={'description'} content={'комплектстрой-рабочий.рф'} />
        <meta name={'keywords'} content={`комплектстрой-рабочий.рф ${products.data.map((p) => p.name).join(' ')}`} />
        <title>Каталог</title>
      </Head>
      <header>
        <Filters query={currentQuery.current} filter={filter} filters={filters} />
      </header>
      <div className={styles.products}>
        {isUpdating && <Loader />}
        {!isUpdating && productsState.data?.map((product) => <ProductItem key={product.id} product={product} />)}
      </div>
      <Pagination paginate={paginate} currentPage={productsState.current_page} lastPage={productsState.last_page} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CatalogProps> = async (context) => {
  const { query } = context;

  try {
    const filtersUrl = new URL('api/catalog/filters', process.env.API_HOST);
    const productsUrl = new URL('api/catalog/products', process.env.API_HOST);
    const { data: filtersData } = await axios.get(`${filtersUrl}`);
    const params: CatalogQueryParams = {
      q: query.q as string,
      page: query.page ? parseInt(query.page as string) : 1,
      order: query.order ? (query.order as string) : 'new',
    };
    if (query.cat !== undefined) {
      params.cat = query.cat as string;
    }
    if (query.man !== undefined) {
      params.man = query.man as string;
    }
    if (query.props !== undefined) {
      params.props = query.props as string;
    }
    if (query.price !== undefined) {
      params.price = JSON.parse(query.price as string);
    }
    if (query.newest) {
      params.newest = true;
    }
    if (query.onSale) {
      params.onSale = true;
    }
    const { data: productsData } = await axios.get(`${productsUrl}`, {
      params,
    });

    return {
      props: {
        products: productsData,
        filters: filtersData,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/server-error',
        permanent: false,
      },
    };
  }
};

export default Catalog;
