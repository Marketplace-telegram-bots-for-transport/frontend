import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './BotHeader.module.scss';

// import { Link } from 'react-router-dom';

function BotHeader({ botName }) {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  // Функция, которая возвращает на предыдущую страницу
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className={styles.botHeader}>
      <button
        className={styles.botHeader__button}
        onClick={goBack}
        aria-label='Кнопка назад'
      />
      <div className={styles.botHeader__mainContainer}>
        <h2 className={styles.botHeader__mainTitle}>Назад</h2>
        <p className={styles.botHeader__mainSubtitle}>
          Главная страница/{botName}
        </p>
      </div>
    </div>
  );
}
export default BotHeader;
