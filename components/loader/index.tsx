import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import styles from './Loader.module.scss';

const Loader = () => {
  const { theme } = useContext(ThemeContext);
  return <span className={`${styles.loader} ${styles[theme]}`}></span>;
};

export default Loader;
