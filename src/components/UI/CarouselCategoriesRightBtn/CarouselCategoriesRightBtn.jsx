import styles from './CarouselCatogoriesRightBtn.module.scss';

const CarouselCategoriesRightBtn = ({ carouselRef }) => {
  const handleRightArrowClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <button
      className={styles.btn}
      aria-label='cats-right-arrow'
      onClick={handleRightArrowClick}
    />
  );
};

export default CarouselCategoriesRightBtn;
