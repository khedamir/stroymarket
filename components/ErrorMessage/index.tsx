import Image from 'next/image';
import React, { FC } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return (
    <span className={styles.error}>
      <Image src={'/images/error.svg'} width={23} height={23} alt="icon" />
      <span>{text}</span>
    </span>
  );
};

export default ErrorMessage;
