/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
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

  const handleSearch = (filter) => {
    setSearchQuery(filter);

    if (!filter || filter === '') {
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
    setSearchQuery('');
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
            Выбрать категории
          </button>

          <div className={styles.category__inputContainer}>
            <ul className={styles.category__list}>
              {showAllCategories && (
                <>
                  <div className={styles.category__search}>
                    <textarea
                      className={styles.category__search_input}
                      type='text'
                      rows={1}
                      placeholder={
                        selectedCategories.join('; ') || 'Поиск по категориям'
                      }
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button
                      className={styles.category__search_button}
                      type='submit'
                      aria-label='Очистить поиск'
                    />
                  </div>

                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={styles.category__listItem}
                    >
                      <li
                        className={`
                        ${styles.category__checkbox} ${
                          selectedCategories.includes(category.name)
                            ? styles.category__checkbox_checked
                            : ''
                        }
                        `}
                        style={{
                          backgroundColor: selectedCategories.includes(
                            category.name
                          ),
                        }}
                        value={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                      >
                        <Category
                          key={category.id}
                          name={category.name}
                          imageUrl={category.imageUrl}
                        />
                        <input
                          className={styles.category__input}
                          type='checkbox'
                          defaultChecked={selectedCategories.includes(
                            category.name
                          )}
                        />
                        <span className={styles.category__icon} />
                      </li>
                    </div>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTitleMainPage;
