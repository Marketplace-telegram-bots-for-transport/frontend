import { useState, useEffect } from 'react';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import styles from './Category.module.scss';

const Category = ({ name, imageUrl /* , onSelectCategory */ }) => {
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  ); // кнопка купить в мобильной версии
  const { handleChange } = useFormAndValidation({});
  const imgStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  const handleCategoryClick = () => {
    /* onSelectCategory(name); */
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCategoryClick();
    }
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
    <div
      className={styles.category}
      onClick={handleCategoryClick}
      onKeyPress={handleKeyPress}
      role='button'
      tabIndex={0}
    >
      <div className={styles.category__img} style={imgStyle} />
      <p className={styles.category__name}>{name}</p>
      {showButton && (
        <form className={styles.category__checkbox}>
          <input
            id={`categoryCheckbox_${name}`}
            className={styles.category__input}
            type='checkbox'
            onChange={handleChange}
          />
          <div
            className={styles.category__wrapper}
            htmlFor={`categoryCheckbox_${name}`}
          />
        </form>
      )}
    </div>
  );
};

export default Category;
