import { useState, useEffect /* , useRef */ } from 'react';
/* import { fetchInitialBots } from '../../utils/api/getBots'; */
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import styles from './CategoriesTitleMainPage.module.scss';
import Category from '../Category/Category';

const CategoriesTitleMainPage = ({ categories }) => {
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]); // сохраняем выбранные категории

  const getCategoryName = (category) => {
    if (category.name) {
      return category.name;
    }
    return category;
  };

  const filteredCategories = categories.filter((c) =>
    getCategoryName(c).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategories([]);
  };

  /* const handleDelete = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  }; */

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCategoryClick();
    }
  };

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
              <>
                <form className={styles.category__search} noValidate>
                  <textarea
                    className={styles.category__search_input}
                    type='text-area'
                    /* rows={1} */
                    placeholder='Поиск по категориям'
                    value={searchQuery || selectedCategories.join(' ')}
                    onChange={handleSearch}
                  />
                  <button
                    className={styles.category__search_button}
                    type='submit'
                    aria-label='Очистить поиск'
                    /* onClick={handleDelete} */
                  />
                </form>

                {filteredCategories.slice(1).map((category) => (
                  <div key={category.id}>
                    <li className={styles.category__listItem}>
                      <Category
                        key={category.id}
                        name={category.name}
                        imageUrl={category.imageUrl}
                      />
                      {/* <img
                        className={styles.botBody__image}
                        src={category.imageUrl}
                        alt='изображение логотипа бота'
                      />
                      <spane>{category.name}</spane> */}
                      <div
                        className={`
                        ${styles.category__checkbox} ${
                          selectedCategories.includes(category.name)
                            ? styles.category__checkbox_checked
                            : ''
                        }
                        `}
                        onKeyPress={handleKeyPress}
                        role='button'
                        tabIndex={0}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <input
                          className={styles.category__input}
                          type='checkbox'
                          checked={selectedCategories.includes(category.name)}
                        />
                        {/* <button
                          onClick={() => handleDelete(category)}
                          aria-label='вап'
                        /> */}
                        <span className={styles.category__icon} />
                      </div>
                    </li>
                  </div>
                ))}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesTitleMainPage;
