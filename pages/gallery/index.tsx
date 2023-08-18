import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { FC, MouseEvent, RefObject, useEffect, useRef, useState } from 'react';
import Paginations from '../../components/Pagination';
import Arrow from '../../public/images/modal-arrow.svg';
import styles from './Gallery.module.scss';

interface GalleryProps {
  current_page: number;
  data: ImagesGroup[];
  total: number;
}

type ImagesGroup = {
  id: number;
  images: ImageType[];
};

type ImageType = {
  uuid: number;
  fileName: string;
  url: string;
  main: string;
};

export const getServerSideProps: GetServerSideProps<GalleryProps> = async () => {
  try {
    const galleryUrl = new URL('api/gallery', process.env.API_HOST);
    const { data } = await axios.get(`${galleryUrl}`);
    return {
      props: {
        current_page: data.current_page,
        data: data.data,
        total: data.total,
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

const Gallery: FC<GalleryProps> = ({ current_page, data, total }) => {
  const [activeProject, setActiveProject] = useState<ImagesGroup>(data[0]);
  const [activeImage, setActiveImage] = useState<number>(0);

  const [modalActive, setModalActive] = useState(false);

  const imgListRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (activeProject) {
      setActiveImage(0);
    }
  }, [activeProject]);

  useEffect(() => {
    if (imgListRef.current) {
      imgListRef.current.style.left = `calc(50% - ${activeImage ? 190 * activeImage + 95 : '95'}px)`;
    }
  }, [activeImage]);

  const galleryImgClick = (item: ImagesGroup) => {
    setActiveProject(item);
    setModalActive(true);
  };

  const changeActiveImg = (id: number, e: MouseEvent) => {
    e.stopPropagation();
    if ((id > 0 || id === 0) && id < activeProject?.images.length) {
      setActiveImage(id);
    }
  };

  const closeModal = () => {
    setModalActive(false);
    setActiveImage(0);
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={closeModal} className={`${styles.modalWrapper} ${modalActive && styles.active}`}>
        <div className={styles.galleryModal}>
          <div className={styles.closeArrowWrapper}>
            <Arrow onClick={closeModal} className={styles.closeArrow} />
          </div>
          <div className={styles.activeImg}>
            <Image
              onClick={(e) => e.stopPropagation()}
              src={activeProject?.images[activeImage].url}
              unoptimized
              width={808}
              height={408}
              alt="preview"
            />
            <div className={styles.arrows}>
              <button
                className={`${activeImage === 0 && styles.deActive}`}
                onClick={(e: MouseEvent) => changeActiveImg(activeImage - 1, e)}
              >
                <Image src="/images/left-arrow.svg" alt="left" width={74} height={74} />
              </button>
              <button
                className={`${activeImage === activeProject?.images.length - 1 && styles.deActive}`}
                onClick={(e: MouseEvent) => changeActiveImg(activeImage + 1, e)}
              >
                <Image src="/images/right-arrow.svg" alt="left" width={74} height={74} />
              </button>
            </div>
          </div>
          <div ref={imgListRef} className={styles.imgList}>
            {activeProject?.images.map((img, i: number) => (
              <Image
                className={`${activeImage === i && styles.active}`}
                unoptimized
                key={i}
                src={img.url}
                alt="img"
                width={177}
                height={128}
                onClick={(e: MouseEvent) => changeActiveImg(i, e)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.galleryList}>
        <div className={styles.gallery}>
          {data.map((item, i) => (
            <div
              onClick={() => galleryImgClick(item)}
              key={item.id}
              className={`${styles.galleryImg} ${styles['ch' + `${i + 1}`]}`}
            >
              <Image src={item.images[0].url} fill alt={'gallery img'} />

              <div className={styles.shadow}>
                <Image src={'/images/gallery-glass.svg'} width={48} height={48} alt="glass" />
                <span>Смотреть объект</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paginations currentPage={current_page} lastPage={total} />
    </div>
  );
};

export default Gallery;
