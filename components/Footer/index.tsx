import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './Footer.module.scss';

const Footer: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.wrapper}>
      <div className={styles.contacts}>
        <Link href="tel:+78001014376">+7 800 101-43-76</Link>
        <p>с 9:00 - 17:00</p>
        <div className={styles.socials}>
          <Link href={'/'}>
            <Image src="/images/instagram.svg" alt="instagram" width={29} height={29} />
          </Link>
          <Link href={'/'}>
            <Image src="/images/facebook.svg" alt="facebook" width={29} height={29} />
          </Link>
          <Link href={'/'}>
            <Image src="/images/vk.svg" alt="vk" width={29} height={29} />
          </Link>
        </div>
      </div>
      <div className={styles.links}>
        <Link href="/privacy-policy">Политика конфиденциальности</Link>
        <Link href="/">Вакансии</Link>
        <Link className={styles.linksItem} href="/legal">
          Для юр. лиц
        </Link>
      </div>
      <div>
        <Image className={styles.Logo} src="/images/white-logo.svg" alt="logo" width={301} height={179} />
        <Link className={styles.footerItemMobile} href="/legal">
          Для юр. лиц
        </Link>
        <p className={styles.footerItemMobile}>© 2022 Комплектстрой</p>
      </div>
    </div>
  </footer>
);

export default Footer;
