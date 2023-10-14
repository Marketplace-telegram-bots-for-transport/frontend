import styles from './CarouselCategoriesLeftBtn.module.scss';

const CarouselCategoriesLeftBtn = ({ carouselRef }) => {
  const handleLeftArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  return (
    <button
      className={styles.btn}
      aria-label='cats-left-arrow'
      onClick={handleLeftArrowClick}
    />
  );
};

export default CarouselCategoriesLeftBtn;
