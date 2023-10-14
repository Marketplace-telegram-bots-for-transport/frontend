import styles from './CarouselCatogoriesRightBtn.module.scss';

const CarouselCategoriesRightBtn = ({ carouselRef }) => {
  const handleLeftArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <button
      className={styles.btn}
      aria-label='cats-right-arrow'
      onClick={handleLeftArrowClick}
    />
  );
};

export default CarouselCategoriesRightBtn;
