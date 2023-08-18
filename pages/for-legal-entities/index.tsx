import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import MobileArrow from '../../public/images/arrow-icon.svg';
import Arrow from '../../public/images/left-arrow.svg';
import styles from './Legal.module.scss';

const Legal = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <Arrow onClick={() => router.back()} className={styles.arrow} />
      <span className={styles.mobileArrow}>
        <MobileArrow />
      </span>

      <Image src="/images/legal.svg" width={100} height={100} alt="legal" />
    </div>
  );
};

export default Legal;
