import Carousel from 'react-multi-carousel';
import Category from '../Category/Category';
import styles from './Categories.module.scss';
import 'react-multi-carousel/lib/styles.css';

const Categories = ({ categories }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
      <div style={{ position: 'relative' }}>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots
          responsive={responsive}
          ssr // means to render carousel on server-side.
          infinite
          autoPlaySpeed={1000}
          keyBoardControl
          customTransition='all .5'
          transitionDuration={500}
          containerClass='carousel-container'
          deviceType='desktop'
          dotListClass='custom-dot-list-style'
        >
          {categories.map((category) => (
            <div key={category.id}>
              <Category name={category.name} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
