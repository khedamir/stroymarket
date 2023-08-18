import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useContext, useMemo, useRef, useState } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CommentResponse, ImageType, ProductCardType, Property } from '../../@types/types';
import AddReview from '../../components/AddReview';
import Button from '../../components/Button';
import Grade from '../../components/Grade';
import CartContext from '../../context/CartContext';
import ThemeContext from '../../context/ThemeContext';
import MobileArrow from '../../public/images/mobile-arrow.svg';
import Arrow from '../../public/images/modal-arrow.svg';
import styles from './Product.module.scss';

type ProductParams = {
  id: string;
};

interface ProductProps {
  product: ProductCardType;
}

export const getServerSideProps: GetServerSideProps<ProductProps, ProductParams> = async (context) => {
  const { id } = context.params || {};
  try {
    const url = new URL(`api/catalog/products/${id}`, process.env.API_HOST);
    const { data } = await axios.get(`${url}`);

    return {
      props: {
        product: data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/server-error',
        permanent: false,
      },
    };
  }
};

const Product: FC<ProductProps> = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const { addProduct, products, setProductQt } = useContext(CartContext);
  const basketProduct = useMemo(() => products.get(product.id), [products, product.id]);
  const [comments, setComments] = useState(product.comments);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToElement = () => {
    if (inputRef.current) {
      const elementTopOffset = inputRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollOffset = elementTopOffset - windowHeight / 2;

      window.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  const handleClick = () => {
    if (!basketProduct) {
      handleToBasketButton();
    }
    inputRef.current?.focus();
    scrollToElement()
  };

  const onChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQt(product.id, parseInt(e.target.value));
  };

  const handleToBasketButton = () => {
    if (!basketProduct) {
      addProduct(product.id);
      inputRef.current?.focus();
      scrollToElement()
    }
  };

  return (
    <div className={`${styles.wrapper} ${styles[theme]}`}>
      <Head>
        <title>{product.name}</title>
      </Head>
      <nav>
        <span onClick={() => router.back()} className={styles.arrow}>
          <Arrow className={styles.desktop} />
          <MobileArrow className={styles.mobile} />
        </span>
        <Link href={'/catalog'}>Каталог</Link>
        <span>&rsaquo;</span>
        <span className={styles.productName}>{product.name}</span>
      </nav>
      <div className={styles.product}>
        <div className={styles.productSlider}>
          <Swiper
            grabCursor={true}
            slidesPerView={1}
            style={{ width: '100%' }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className={`${styles.sliderContainer}`}
            modules={[Navigation]}
          >
            {product.images.map((img: ImageType) => (
              <SwiperSlide key={img.uuid}>
                <div className={styles.productImage}>
                  <Image src={img.url} alt="product" width={520} height={343} />
                  {product.sale !== null ? (
                    <>
                      <span className={styles.yellowBlock}></span>
                      <span className={styles.percent}>%</span>
                    </>
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
            <div className="slider-controler">
              <div className={`swiper-button-prev slider-arrow ${styles.sliderArrow} ${styles.left}`}>
                <button id="left">
                  <Image src="/images/perple-arrow.svg" width={74} height={74} alt="left" />
                </button>
              </div>
              <div className={`swiper-button-next slider-arrow ${styles.sliderArrow} ${styles.right}`}>
                <button id="right">
                  <Image src="/images/perple-arrow.svg" width={74} height={74} alt="right" />
                </button>
              </div>
            </div>
          </Swiper>
        </div>
        <div className={styles.productDescription}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <span className={styles.rating}>
            <Grade clickable={false} value={product.rating} />
          </span>
          <div className={styles.priceInfo}>
            <span className={styles.price}>
              {product.price.active}₽ <span className={styles.oldPrice}>{product.price.old}₽</span>
            </span>
            <Button onClick={handleClick} styleType="blue">
              {!basketProduct ? 'Добавить в корзину' : 'Выбрать количество'}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.priceBlock}>
        <div className={styles.productQuantity}>
          <p>Количество</p>
          <p>Цена</p>
          <label className={styles.quantityInput}>
            <input
              ref={inputRef}
              type="number"
              disabled={!basketProduct}
              value={basketProduct ? basketProduct : 0}
              onChange={(e) => setProductQt(product.id, parseInt(e.target.value))}
              min={1}
            />
            <span>шт</span>
          </label>
          <span className={styles.quantityPrice}>
            {product.price.active}
            <span>₽</span>
          </span>
        </div>
        <div className={styles.total}>
          <p>Итог</p>
          <p className={styles.totalDescription}>{product.name}</p>
          <div className={styles.totalPrice}>
            <span>
              Количество:{' '}
              <span>
                {basketProduct ? basketProduct : 1} {product.measure.shorten}
              </span>
            </span>
            <span>
              Цена:{' '}
              <span>{basketProduct ? (product.price.active * basketProduct).toFixed(1) : product.price.active} ₽</span>
            </span>
            {/* <Button onClick={() => handleToBasketButton()} styleType="blue">
              {!basketProduct ? 'В корзину' : 'Перейти в корзину'}
            </Button> */}
          </div>
        </div>
        <Button onClick={handleClick} styleType="blue">
          {!basketProduct ? 'Добавить в корзину' : 'Выбрать количество'}
        </Button>
      </div>
      <div className={styles.productDescriptionMobile}>
        <h3>Описание</h3>
        <p>{product.description}</p>
      </div>
      <div className={styles.addReviewBlock}>
        <AddReview comments={comments} setComments={(c: CommentResponse[]) => setComments(c)} productId={product.id} />
        <div className={styles.description}>
          <h3>Характеристики</h3>
          <ul className={styles.descriptionList}>
            {product.properties.map((item: Property) => (
              <li key={item.id}>
                {item.name}
                <span className={styles.listLine}></span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.reviews}>
        <h3>Отзывы</h3>
        <div className={styles.reviewsWrapper}>
          {comments.length > 0 ? (
            <>
              <ul className={styles.reviewsList}>
                {comments.map((item: CommentResponse) => (
                  <li key={item.id}>
                    <div className={styles.nameBlock}>
                      <h4>{item.name}</h4>
                      <p>
                        {new Date(item.date).toLocaleDateString('ru-Ru', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className={styles.commentBlock}>
                      <span>
                        <Grade clickable={false} value={item.rating} />
                      </span>
                      <p>{item.comment}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <span>Отзывов больше нет</span>
            </>
          ) : (
            <>
              <span>Отзывы отсутстуют</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
