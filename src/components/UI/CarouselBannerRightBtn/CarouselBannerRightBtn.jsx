import styles from './CarouselBannerRightBtn.module.scss';

const CarouselBannerRightBtn = ({ carouselRef }) => {
  const handleRightArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <button
      className={styles.btn}
      aria-label='banner-left-arrow'
      onClick={handleRightArrowClick}
    />
  );
};

export default CarouselBannerRightBtn;
