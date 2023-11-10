import { useState } from 'react';
import styles from './Category.module.scss';

const Category = ({ name, imageUrl, imageUrlHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imgStyle = {
    backgroundImage: `url(${isHovered ? imageUrlHover : imageUrl})`,
  };

  return (
    <div
      className={styles.category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.category__img} style={imgStyle} />
      <p className={styles.category__name}>{name}</p>
    </div>
  );
};

export default Category;
