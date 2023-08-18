import React, { ChangeEvent, MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import MapIcon from '../../../public/images/map-icon.svg';
import Input from '../../Input';
import styles from './ToggleCity.module.scss';
import Cross from '../../../public/images/cross.svg'

const Cities = [
  { id: 0, value: 'Ярославль' },
  { id: 1, value: 'Москва' },
  { id: 2, value: 'Санкт-Петербург' },
  { id: 3, value: 'Стамбул' },
  { id: 4, value: 'Грозный' },
  { id: 5, value: 'Волгоград' },
  { id: 6, value: 'Ростов' },
  { id: 7, value: 'Аргун' },
];

const ToggleCity = () => {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState('');
  const filteredCities = Cities.filter((city) => city.value.includes(value));
  const [selectedCity, setSelectedCity] = useState({ value: '' });

  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCity = (e: MouseEvent<HTMLLIElement>, city: { value: string }) => {
    setValue('');
    setSelectedCity(city);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      // Проверяем, что клик произошел не на элементе списка
      if (!inputRef.current?.contains(document.activeElement)) {
        setIsActive(false);
      }
    }, 100);
  };

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (selectedCity.value && value !== '') {
      setSelectedCity({ value: '' });
    }
  }, [selectedCity.value, value]);

  return (
    <>
      <div className={`${styles.toggleCityHeader} ${styles[theme]} ${isActive && styles.active}`}>
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.30303 0.75L1 6.75M7.30303 12.75L1 6.75M1 6.75H7.30303H17"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>Укажите город</span>
      </div>
      <div className={`${styles.toggleCity} ${styles[theme]} ${isActive && styles.active}`}>
        {value ? <Cross onClick={() => setValue('')} className={styles.cross} /> : <MapIcon />}
        <Input
          value={selectedCity.value || value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputValue}
          placeholder={isActive ? 'Укажите ваш город' : 'Укажите город'}
          ref={inputRef}
        />
        <ul className={styles.citiesList}>
          {filteredCities.map((city) => (
            <li
              className={selectedCity.value === city.value ? styles.selectCity : ''}
              onClick={(e) => handleCity(e, city)}
              key={city.id}
            >
              {city.value}

              {selectedCity.value === city.value && (
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 5.5L4.63254 10.3434C5.05192 10.9026 5.90094 10.87 6.2762 10.2803L12.5 0.5"
                    stroke="#D88100"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToggleCity;
