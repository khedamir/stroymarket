import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import ThemeContext from '../../context/ThemeContext';
import Paginate from '../Paginate';
import styles from './Paginations.module.scss';

interface PaginationsProps {
  currentPage: number;
  lastPage: number;
  paginate?: (page: number) => void;
}

const Paginations: FC<PaginationsProps> = ({ currentPage, lastPage, paginate }) => {
  const { theme } = useContext(ThemeContext);
  const [localCurrentPage, setCurrentPage] = useState(currentPage);
  const [value, setValue] = useState('');
  const maxDisplayPageCount = useRef(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setValue('Desktop');
        maxDisplayPageCount.current = 7
      } else {
        setValue('Mobile');
        maxDisplayPageCount.current = 4
      }
    };

    handleResize()
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const handlePageClick = (page: number) => {
    if (paginate) {
      paginate(page);
    }
    setCurrentPage(page);
  };

  return (
    <div className={`${styles.paginations} ${styles[theme]}`}>
      {currentPage < lastPage && <button>Показать еще</button>}
      <Paginate 
        activePage={currentPage} 
        totalPage={lastPage} 
        setActivePage={handlePageClick} 
        maxDisplayPageCount={value === 'Mobile' ? 5 : 7} 
        />
    </div>
  );
};

export default Paginations;
