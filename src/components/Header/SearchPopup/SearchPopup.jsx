import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchPopup.module.scss';

function SearchPopup({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // данные в поисковой строке
  /* const [searchQuery, setSearchQuery] = useState(''); */
  /* const [historySearch, setHistorySearch] = useState({}); // данные истории поиска */

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/');
    onSearch(searchQuery);
  }

  function handleСhange(e) {
    setSearchQuery(e.target.value);
  }

  function handleClosePopup() {}

  return (
    <div className={styles.searchPopup}>
      <div className={styles.searchPopup__container}>
        <div className={styles.searchPopup__title}>
          <button
            className={styles.searchPopup__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={handleClosePopup}
          />
          <h2 className={styles.searchPopup__textTitle}>Поиск</h2>
        </div>
        <form
          className={styles.searchPopup__form}
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            className={styles.searchPopup__input}
            type='text'
            placeholder='Поиск'
            value={searchQuery || ''}
            onChange={handleСhange}
          />
          <button
            className={styles.searchPopup__button}
            type='submit'
            aria-label='Просмотреть историю поиска'
          >
            История поиска
          </button>
        </form>
        {/* если есть какие то результаты поиска */}
        <div>
          <div>
            <h3>Результаты поиска</h3>
            <ul>
              <li />
            </ul>
          </div>
        </div>
        {/* конец результаты поиска */}

        {/* если есть история поиска */}
        <div>
          <div>
            <h3>История поиска</h3>
            <ul>
              <li />
            </ul>
            <button>
              <div />
              <p>Очистить историю поиска</p>
            </button>
          </div>
        </div>
        {/* конец история поиска */}
      </div>
    </div>
  );
}

export default SearchPopup;
