import styles from './CarouselBannerLeftBtn.module.scss';

const CarouselBannerLeftBtn = ({ carouselRef }) => {
  const handleLeftArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <button
      className={styles.btn}
      aria-label='banner-left-arrow'
      onClick={handleLeftArrowClick}
    />
  );
};

export default CarouselBannerLeftBtn;
