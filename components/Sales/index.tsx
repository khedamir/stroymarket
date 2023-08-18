import Image from 'next/image';
import React, { FC, useContext } from 'react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SalesType } from '../../@types/types';
import ThemeContext from '../../context/ThemeContext';
import SaleItem from '../SaleItem';

type SalesProps = {
  sales: SalesType;
};

const Sales: FC<SalesProps> = ({ sales }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`sales ${theme}`}>
      <div className="container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          spaceBetween={-159}
          loop={true}
          slidesPerView={'auto'}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container"
        >
          {sales.products.map((sale) => (
            <SwiperSlide key={sale.id}>
              <SaleItem percent={sales.percent} product={sale} />
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <button id="left"></button>
            </div>
            <div className="swiper-button-next slider-arrow">
              <button id="right"></button>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
        <div className="arrows">
          <label htmlFor="left">
            <Image src="/images/left-arrow.svg" alt="left" width={74} height={74} />
          </label>
          <label htmlFor="right">
            <Image src="/images/right-arrow.svg" alt="left" width={74} height={74} />
          </label>
        </div>
      </div>
    </section>
  );
};

export default Sales;
