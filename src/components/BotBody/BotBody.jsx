// /* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import styles from './BotBody.module.scss';

function Botbody({ botName, botAuthor, botDescription, botImage }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className={styles.botBody}>
      <img
        className={styles.botBody__image}
        src={botImage}
        alt='изображение логотипа бота'
      />
      <div className={styles.botBody__info}>
        <div className={styles.botBody__name}>
          <h2 className={styles.botBody__title}>{botName}</h2>
          <div className={styles.botBody__linkLikeSection}>
            <button
              className={styles.botBody__linkButton}
              aria-label='кнопка'
            />
            <button
              className={styles.botBody__favoritesButton}
              aria-label='кнопка'
            />
          </div>
        </div>
        <p className={styles.botBody__subtitle}>{botAuthor}</p>
        <p
          className={`${styles.botBody__description} ${
            isDescriptionExpanded ? styles.botBody__descriptionExpanded : ''
          }`}
        >
          {botDescription}
        </p>
        <button
          className={styles.botBody__showMoreButton}
          onClick={toggleDescription}
        >
          {isDescriptionExpanded ? 'Скрыть описание' : 'Показать полный текст'}
        </button>
      </div>
    </div>
  );
}
export default Botbody;
