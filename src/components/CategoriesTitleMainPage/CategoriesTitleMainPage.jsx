import { useState, useEffect } from 'react';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import styles from './CategoriesTitleMainPage.module.scss';
import Category from '../Category/Category';

const CategoriesTitleMainPage = ({ categories }) => {
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  ); // кнопка купить в мобильной версии
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCategories = showAllCategories ? categories.slice(1) : [];

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
    <div className={styles.container}>
      <h2 className={styles.title}>Категории</h2>
      {showButton && (
        <div className={styles.category}>
          <button
            className={styles.category__button}
            aria-label='Открыть весь список категорий'
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            <div className={styles.category__image} />
            Все категории
          </button>
          <ul className={styles.category__list}>
            {showAllCategories && (
              <form
                className={styles.category__search}
                noValidate
                /* onSubmit={handleSubmit} */
              >
                <input
                  className={styles.category__search_input}
                  type='text'
                  placeholder='Поиск по категориям'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className={styles.category__search_button}
                  type='submit'
                  aria-label='Очистить поиск'
                />
              </form>
            )}
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <li className={styles.category__listItem}>
                  <Category
                    key={category.id}
                    name={category.name}
                    imageUrl={category.imageUrl}
                  />
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesTitleMainPage;
