import Image from 'next/image';
import React, { ChangeEvent, FC, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { ManufacturerType } from '../../@types/types';
import ThemeContext, { THEME } from '../../context/ThemeContext';
import Checkbox from '../Checkbox';
import styles from './Popup.module.scss';

interface PopupProps {
  preview: string;
  lists?: ManufacturerType[];
  selectedItems?: number[];
  onChange?: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
  children?: ReactNode;
  active?: boolean;
  onChangeActive?: (value: boolean) => void;
}

const Popup: FC<PopupProps> = ({
  preview,
  lists,
  children,
  selectedItems,
  onChange,
  active = false,
  onChangeActive,
}) => {
  const { theme } = useContext(ThemeContext);
  const [popupActive, setPopupActive] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function ChangeClick(event: MouseEvent) {
      if (node.current && !node.current.contains(event.target as Node)) {
        setPopupActive(false);
      }
    }
    document.body.addEventListener('click', ChangeClick);

    return () => {
      document.body.removeEventListener('click', ChangeClick);
    };
  }, []);

  useEffect(() => {
    setPopupActive(active);
  }, [active]);

  const handleActive = () => {
    setPopupActive(!popupActive);
    if (onChangeActive) {
      onChangeActive(!active);
    }
  };

  const getHeight = () => {
    if (popupActive || active) {
      const child = popupRef.current?.firstChild as HTMLElement;
      return child?.clientHeight;
    }
    return 0;
  };

  return (
    <div ref={node} className={`${styles.popup} ${theme && styles[theme]} ${(popupActive || active) && styles.active}`}>
      <div onClick={handleActive} style={{ zIndex: `${popupActive ? 1001 : 0}` }} className={styles.preview}>
        <span>{preview}</span>
        <span>
          <Image
            src={theme === THEME.DARK ? '/images/popup-arrow.svg' : '/images/popup-arrow-dark.svg'}
            width={23}
            height={13}
            alt="arrow"
          />
        </span>
      </div>
      <div
        ref={popupRef}
        style={{
          height: `${getHeight()}px`,
        }}
        className={styles.popupWrapper}
      >
        <ul className={styles.popupList}>
          {children}
          {lists?.map(({ name, id }) => (
            <li key={id}>
              <Checkbox
                type="checkbox"
                id={name}
                checked={selectedItems?.includes(id)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onChange && onChange(event, id)}
              />
              <label htmlFor={name}>{name}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
