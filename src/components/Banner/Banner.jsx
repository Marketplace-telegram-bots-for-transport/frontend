/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import styles from './Banner.module.scss';
import 'react-multi-carousel/lib/styles.css';
import CarouselBannerLeftBtn from '../UI/CarouselBannerLeftBtn/CarouselBannerLeftBtn';
import CarouselBannerRightBtn from '../UI/CarouselBannerRightBtn/CarouselBannerRightBtn';

const CustomDot = ({ index, onClick, active }) => {
  const dotClass = `${styles.banner__dot} ${
    active ? styles.banner__dot_active : ''
  }`;

  return (
    <li>
      <button
        className={dotClass}
        aria-label={`dot-${index}`}
        onClick={(e) => {
          onClick();
          e.preventDefault();
        }}
      />
    </li>
  );
};

const Banner = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.banner}>
      <Carousel
        ref={carouselRef}
        renderArrowsWhenDisabled
        showDots
        infinite
        responsive={responsive}
        className={styles.banner__carousel}
        dotListClass={styles.banner__dotList}
        customLeftArrow={<CarouselBannerLeftBtn carouselRef={carouselRef} />}
        customRightArrow={<CarouselBannerRightBtn carouselRef={carouselRef} />}
        customDot={<CustomDot />}
      >
        <div className={styles.banner__titlebox} />
        <div
          className={`${styles.banner__titlebox} ${styles.banner__specialOne}`}
          onClick={() => navigate('/special-offers/1')}
          role='button'
          tabIndex={0}
          aria-label='special-1'
        />
        <div
          className={`${styles.banner__titlebox} ${styles.banner__specialTwo}`}
          onClick={() => navigate('/special-offers/2')}
          role='button'
          tabIndex={0}
          aria-label='special-2'
        />
        <div
          className={`${styles.banner__titlebox} ${styles.banner__specialThree}`}
          onClick={() => navigate('/special-offers/3')}
          role='button'
          tabIndex={0}
          aria-label='special-3'
        />
      </Carousel>
    </div>
  );
};

export default Banner;
