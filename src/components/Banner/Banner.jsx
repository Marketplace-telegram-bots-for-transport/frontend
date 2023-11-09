import { useRef, useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import styles from './Banner.module.scss';
import 'react-multi-carousel/lib/styles.css';
import CarouselBannerLeftBtn from '../UI/CarouselBannerLeftBtn/CarouselBannerLeftBtn';
import CarouselBannerRightBtn from '../UI/CarouselBannerRightBtn/CarouselBannerRightBtn';
import { WIDTH_SCREEN_768 } from '../../utils/constants';

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
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  ); // кнопка купить в мобильной версии
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

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.banner}>
      {showButton ? (
        <Carousel
          ref={carouselRef}
          renderArrowsWhenDisabled
          showDots
          infinite
          responsive={responsive}
          className={styles.banner__carousel}
          dotListClass={styles.banner__dotList}
          customLeftArrow={<CarouselBannerLeftBtn carouselRef={carouselRef} />}
          customRightArrow={
            <CarouselBannerRightBtn carouselRef={carouselRef} />
          }
          customDot={<CustomDot />}
        >
          <div className={styles.banner__titleboxMobile} />
        </Carousel>
      ) : (
        <Carousel
          ref={carouselRef}
          renderArrowsWhenDisabled
          showDots
          infinite
          responsive={responsive}
          className={styles.banner__carousel}
          dotListClass={styles.banner__dotList}
          customLeftArrow={<CarouselBannerLeftBtn carouselRef={carouselRef} />}
          customRightArrow={
            <CarouselBannerRightBtn carouselRef={carouselRef} />
          }
          customDot={<CustomDot />}
        >
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
          <div className={styles.banner__titlebox} />
        </Carousel>
      )}
    </div>
  );
};

export default Banner;
