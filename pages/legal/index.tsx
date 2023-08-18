import Image from 'next/image';
import React from 'react';
import styles from './Legal.module.scss';

const Legal = () => {
  const InformationList = [
    { name: 'ПОЛНОЕ НАИМЕНОВАНИЕ', text: 'ОБЩЕСТВО С ОГРАНИЧЕНОЙ ОТВЕТСТВЕННОСТЬЮ "КОМПЛЕКТСТРОЙ"' },
    { name: 'КРАТКОЕ НАИМЕНОВАНИЕ', text: 'ООО "КОМПЛЕКТСТРОЙ"' },
    { name: 'ЮОТДИЧЕСКИЙ АДРЕС', text: 'г Ярославль, Ленинградский пр-кт, д 33, офис 209Б' },
    { name: 'ПОЧТОВЫЙ АДРЕС', text: 'г Ярославль, Ленинградский пр-кт, д 33, офис 209Б' },
    { name: 'ИНН', text: 'г Ярославль, Ленинградский пр-кт, д 33, офис 209Б' },
    { name: 'КПП', text: '760601001' },
    { name: 'ОГРН', text: '122760013167' },
    { name: 'ОКПО', text: '95019090' },
    { name: 'ОКФС/ОКОПФ', text: '16/12300' },
    { name: 'Генеральный директор', text: 'Шихвердиев Равик Гюльметович' },
    { name: 'Контактный телефон', text: '8(4852) 98-66-33' },
    { name: 'Электронная почта', text: 'info@комплектстрой.рф' },
    { name: 'Сайт организации', text: 'Комплектстрой.рф' },
  ];

  const Requisites = [
    { name: 'НАИМЕНОВАНИЕ БАНКА', text: 'АО "АЛЬФА-БАНК"' },
    { name: 'РАСЧЕТНЫЙ СЧЕТ', text: '40702810001140000359' },
    { name: 'КОРЕСПОНДЕНТСКИЙ СЧЕТ', text: '30101810200000000593' },
    { name: 'БИК', text: '044525593' },
  ];
  return (
    <div className={styles.legal}>
      <div className={styles.layout}>
        <Image src={'/images/frame1.svg'} width={75} height={1000} alt="frame" />
        <Image src={'/images/frame2.svg'} width={250} height={1000} alt="frame" />
      </div>
      <div className={styles.content}>
        <Image className={styles.Logo} src={'./images/legalLogo.svg'} alt="logo" width={100} height={100} />
        <header>
          <p>Экономь время и средства</p>
          <h2>Карточка предприятия</h2>
        </header>
        <ul className={styles.contentList}>
          {InformationList.map((item, i) => (
            <li key={i}>
              <span>{item.name}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
        <h2>Банковские реквизиты</h2>
        <ul className={styles.contentList}>
          {Requisites.map((item, i) => (
            <li key={i}>
              <span>{item.name}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Legal;
