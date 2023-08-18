import Image from 'next/image';
import React, { FC, InputHTMLAttributes, Ref, useContext, useEffect, useRef, useState } from 'react';
import styles from './Grade.module.scss';
import ThemeContext from '../../context/ThemeContext';

interface GradeProps {
  clickable: boolean;
  onChange?: (grade: number) => void;
  value?: string | number;
}

const Grade: FC<GradeProps> = ({ value, clickable, onChange }: GradeProps) => {
  const {theme} = useContext(ThemeContext)
  const gradesArray = [1, 2, 3, 4, 5];
  const [selectedGrade, setSelectedGrade] = useState(value || 0);

  const lightStar = {
    full: '/images/star-full-light.svg',
    empty: '/images/star-empty-light.svg'
  }

  const darkStar = {
    full: '/images/star-full.svg',
    empty: '/images/star-empty.svg'
  }

  const stars = {
    light: lightStar,
    dark: darkStar,
  }

  useEffect(() => {
    if (value && value !== 0) {
      setSelectedGrade(value);
    }
  }, [value]);
  const handleClick = (grade: number) => {
    if (clickable) {
      setSelectedGrade(grade);
      if (onChange) {
        onChange(grade);
      }
    }
  };
  const isActiveStar = (i: number) => {
    return i <= Number(selectedGrade);
  };

  return (
    <span className={styles.grade}>
      {gradesArray.map((value, index) => (
        <Image
          key={index}
          src={isActiveStar(value) ? stars[theme].full : stars[theme].empty}
          width={17}
          height={17}
          alt="star"
          onClick={(e) => handleClick(value)}
        />
      ))}
    </span>
  );
};
Grade.displayName = 'Grade';

export default Grade;
