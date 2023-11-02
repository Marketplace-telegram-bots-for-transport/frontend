// /* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import styles from './BotBody.module.scss';

function Botbody({
  botName,
  botAuthor,
  botCategory,
  botDescription,
  botImage,
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    const currentURL = window.location.href;

    const textArea = document.createElement('textarea');
    textArea.value = currentURL;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    setCopied(true);
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
              className={styles.botBody__favoritesButton}
              aria-label='кнопка'
            />
            <button
              className={styles.botBody__linkButton}
              aria-label='кнопка'
              onClick={copyToClipboard}
            />
            {copied ? 'Ссылка скопирована!' : ''}
          </div>
        </div>
        <p className={styles.botBody__subtitle}>{botAuthor}</p>
        <p className={styles.botBody__subtitle_category}>{botCategory}</p>
        <p
          className={`${styles.botBody__description} ${
            isDescriptionExpanded ? styles.botBody__descriptionExpanded : ''
          }`}
        >
          {botDescription}
        </p>
        <button
          className={`${styles.botBody__showMoreButton}
          ${
            isDescriptionExpanded
              ? styles.botBody__showMoreButton_arrowUp
              : styles.botBody__showMoreButton_arrowDown
          }
          `}
          onClick={toggleDescription}
        >
          {isDescriptionExpanded ? 'Скрыть описание' : 'Показать полный текст'}
        </button>
      </div>
    </div>
  );
}
export default Botbody;
