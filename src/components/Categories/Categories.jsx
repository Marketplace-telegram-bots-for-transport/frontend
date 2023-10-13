import { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import Category from '../Category/Category';
import styles from './Categories.module.scss';
import 'react-multi-carousel/lib/styles.css';
import CarouselCategoriesLeftBtn from '../UI/CategoriesLeftBtn/CarouselCategoriesLeftBtn';

const Categories = ({ categories }) => {
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.categories}>
      <Carousel
        ref={carouselRef}
        className={styles.categories__carousel}
        renderArrowsWhenDisabled
        infinite
        responsive={responsive}
        customLeftArrow={
          <CarouselCategoriesLeftBtn carouselRef={carouselRef} />
        }
      >
        {categories.map((category) => (
          <div key={category.id}>
            <Category name={category.name} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
