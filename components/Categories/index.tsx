import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import { CategoryType } from '../../@types/types';
import ThemeContext, { THEME } from '../../context/ThemeContext';
import styles from './Categories.module.scss';

type CategoriesProps = {
  categories: CategoryType[];
};

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${styles.categories} ${styles[theme]}`}>
      <h2>Мы предоставляем</h2>
      <ul className={styles.categoryItems}>
        {categories.map((category) => (
          <Link href={`/catalog?cat=${category.id}`} key={category.id}>
            <li>
              <Image
                src={`${theme === THEME.DARK ? category.icon.dark : category.icon.light}`}
                alt="category"
                width={150}
                height={150}
              />
              <p>{category.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
