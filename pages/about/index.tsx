import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEvent, useContext, useRef } from 'react';
import Button from '../../components/Button';
import ThemeContext from '../../context/ThemeContext';
import ArrowIcon from '../../public/images/arrow-icon.svg';
import CopyIcon from '../../public/images/copy-icon.svg';
import PhoneIcon from '../../public/images/phone-icon.svg';
import VkIcon from '../../public/images/vk-icon.svg';
import YuotubeIcon from '../../public/images/youtube-icon.svg';
import styles from './About.module.scss';

const About = () => {
  const { theme } = useContext(ThemeContext);

  //либо можно сделать два Ref-а на блоки с номерами и оттуда доставать номера.
  //а для кнопок сделать отдельные функции для каждой которая потом вызывает
  //эту функцию Copy с полученным номером.
  //либо у тебя будет своя какая-то идея.
  const Copy = (event: MouseEvent<HTMLSpanElement>, text: string) => {
    const target = event.target as HTMLSpanElement;
    // Создаем временный элемент
    var tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    // Выделяем текст внутри временного элемента
    tempElement.select();
    tempElement.setSelectionRange(0, 99999);
    // Копируем текст в буфер обмена
    document.execCommand('copy');
    target.classList.add(styles.active);
    // Удаляем временный элемент
    document.body.removeChild(tempElement);

    setTimeout(() => {
      target.classList.remove(styles.active);
    }, 300);
  };

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <div className={styles.about}>
        <h2>О нас</h2>
        <div className={styles.content}>
          <div>
            <Image src={'/images/about1.png'} width={444} height={221} alt="about" />
            <p>
              Компания {'КомплектСтрой.РФ'} - молодая и динамично развивающаяся компания, которая занимается продажей
              строительных материалов высокого качества. Мы основаны 8 августа 2022 года в городе Ярославль и за
              короткое время своей работы смогли завоевать доверие и признание многих клиентов.
            </p>
          </div>

          <div>
            <Image src={'/images/about2.png'} width={444} height={221} alt="about" />
            <p>
              Мы гордимся тем, что наша компания основана на таких ценностях, как скорость, качество и отношение к
              каждому клиенту. Мы всегда стремимся предложить нашим клиентам конкурентные цены и высокую скорость
              работы, не забывая о качестве нашей продукции.
            </p>
          </div>

          <div>
            <Image src={'/images/about3.png'} width={444} height={221} alt="about" />
            <p>
              Опыт наших специалистов в строительном бизнесе составляет более 10 лет. Благодаря этому мы можем
              гарантировать нашим клиентам профессиональный подход и высокую квалификацию наших сотрудников.
            </p>
          </div>

          <div>
            <Image src={'/images/about4.png'} width={444} height={221} alt="about" />
            <p>
              Мы стремимся стать не только региональной, но и всероссийской компанией. Мы планируем расширяться и
              открывать новые отделения в разных регионах России. Наша цель - стать лучшей компанией на рынке
              строительных материалов и достигнуть успеха во всех своих начинаниях.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.contacts}>
        <div className={styles.map}>
          <h3>Наше местоположение</h3>
          <p> Ярославль, Ленинградский проспект, 33</p>
          <span>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Af1625735d0655993351d91f42450caea8cd9f8baefc80e0a6b0aca0bbf3f8cc4&amp;source=constructor"
              width="550"
              height="364"
              frameBorder="0"
            ></iframe>
            <Button styleType="blue">Открыть на Яндекс Картах</Button>
          </span>
        </div>
        <div className={styles.links}>
          <h3>Контакты</h3>
          <ul className={styles.linksList}>
            <li>
              <PhoneIcon />
              <a href="tel:+78001014376" className={styles.linkDescription}>
                +7 800 101-43-76
              </a>
              <span className={styles.copyBtn} onClick={(e) => Copy(e, '+7 800 101-43-76')}>
                <CopyIcon />
              </span>
            </li>
            <li>
              <PhoneIcon />
              <a href="tel:+74852388476" className={styles.linkDescription}>
                +7 485 238-84-76
              </a>
              <span className={styles.copyBtn} onClick={(e) => Copy(e, '+7 485 238-84-76')}>
                <CopyIcon />
              </span>
            </li>
            <li>
              <YuotubeIcon />
              <span className={styles.linkDescription}>КомплексСтрой.рф</span>
              <Link target="_blank" href={'https://www.youtube.com/'}>
                <span>
                  <ArrowIcon />
                </span>
              </Link>
            </li>
            <li>
              <VkIcon />
              <span className={styles.linkDescription}>КомплексСтрой.рф</span>
              <Link target="_blank" href={'https://vk.com/'}>
                <span>
                  <ArrowIcon />
                </span>
              </Link>
            </li>
            <li>График работы: 9:00-17:00</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
