import axios from 'axios';
import { GetServerSideProps } from 'next';
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { CategoryType, SalesType } from '../@types/types';
import Button from '../components/Button';
import Categories from '../components/Categories';
import Contacts from '../components/Contacts';
import Sales from '../components/Sales';
import styles from '../styles/Home.module.scss';

interface HomeProps {
  categories: CategoryType[];
  sale: SalesType;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const url = new URL('api/main', process.env.API_HOST);
    const { data } = await axios.get(`${url}`);
    return {
      props: {
        categories: data.categories,
        sale: data.sale,
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

export default function Home({ categories, sale }: HomeProps) {
  const router = useRouter();
  return (
    <div className={`${styles.wrapper}`}>
      <Head>
        <title>Комплекс Строй</title>
        <meta name={'description'} content={'комплектстрой-рабочий.рф'} />
        <meta name={'description'} content={'комплектстрой-рабочий.рф'} />
        <meta name={'keywords'} content={`комплектстрой-рабочий.рф ${categories.map((c) => c.name).join(' ')}`} />
      </Head>
      <header className={styles.homeHeader}>
        <div className={styles.headerDescription}>
          <h2>Постройте произведения искусства с нашими материалами</h2>
          <p>Преобретите наши строительные материалы наилучшего качества и будьте довольны работой</p>
          <Button onClick={() => router.push('/catalog')} styleType="red">
            В каталог
          </Button>
        </div>
      </header>
      <main className={styles.main}>
        <Categories categories={categories} />
        <Sales sales={sale} />
        <Contacts />
      </main>
    </div>
  );
}
