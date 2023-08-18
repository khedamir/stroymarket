import Link from 'next/link';
import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './Button.module.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  styleType: stylesType;
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
  children: ReactNode;
};

type stylesType = 'red' | 'yellow' | 'green' | 'blue' | 'blueLight' | 'success';

const Button: FC<buttonProps> = ({ styleType, children, ...rest }) => {
  return (
    <button {...rest} className={`${styles.button} ${styles[styleType]}`}>
      {children}
    </button>
  );
};

export default Button;
