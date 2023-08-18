import React, { FC } from 'react';
import Arrow from '../../public/images/pagination-arrow.svg';
import styles from './Paginate.module.scss';

interface PaginateProps {
  activePage: number;
  totalPage: number;
  setActivePage: (page: number) => void;
  maxDisplayPageCount: number;
}

const Paginate: FC<PaginateProps> = ({ activePage, totalPage, setActivePage, maxDisplayPageCount }) => {
  const pagePos = Math.floor(maxDisplayPageCount / 2) - 2;
  const items: string[] = [];

  if (totalPage <= maxDisplayPageCount) {
    for (let i = 1; i <= totalPage; i++) {
      items.push(i.toString());
    }
  }

  if (totalPage > maxDisplayPageCount) {
    if (activePage === 1) {
      for (let i = 1; i <= maxDisplayPageCount - 2; i++) {
        items.push(i.toString());
      }
      items.push('...', totalPage.toString());
    }

    if (activePage > 1) {
      if (activePage < maxDisplayPageCount - 2) {
        for (let i = 1; i <= maxDisplayPageCount - 2; i++) {
          items.push(i.toString());
        }
        items.push('...', totalPage.toString());
      }

      if (activePage >= maxDisplayPageCount - 2) {
        items.push('1', '...');
        if (activePage + maxDisplayPageCount - 3 < totalPage) {
          for (let i = activePage - pagePos; i <= activePage + pagePos; i++) {
            items.push(i.toString());
          }
          items.push('...', totalPage.toString());
        }

        if (activePage + maxDisplayPageCount - 3 >= totalPage) {
          let arr: string[] = [];
          for (let i = totalPage; i >= totalPage - maxDisplayPageCount + 3; i--) {
            arr.push(i.toString());
          }
          items.push(...arr.reverse());
        }
      }
    }
  }

  return (
    <div className={styles.paginations}>
      <span
        onClick={() => setActivePage(activePage - 1)}
        className={`${styles.leftArrow} ${activePage > 1 && styles.active}`}
      >
        <Arrow />
      </span>
      {items.map((item, i) => (
        <label
          key={i}
          className={`${styles.page} ${activePage.toString() === item && styles.active}`}
          onClick={() => (item !== '...' ? setActivePage(parseInt(item)) : setActivePage(parseInt(items[i - 1]) + 1))}
        >
          {item}
        </label>
      ))}
      <span
        onClick={() => setActivePage(activePage + 1)}
        className={`${styles.rightArrow} ${activePage < totalPage && styles.active}`}
      >
        <Arrow />
      </span>
    </div>
  );
};

export default Paginate;
