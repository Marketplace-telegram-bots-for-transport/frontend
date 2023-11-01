import React from 'react';
import styles from './FormCommon.module.scss';

function FormCommon({
  name,
  showBackButton,
  onClick,
  title,
  onSubmit,
  children,
  isDisabled,
  buttonText,
}) {
  return (
    <section
      className={`
        ${styles.formCommon}
        ${styles[`form_type_${name}`]}
      `}
    >
      <div className={styles.formCommon__container}>
        <div className={styles.formCommon__actionContainer}>
          {showBackButton && (
            <button
              aria-label='Вернуться назад'
              className={styles.formCommon__actionContainer_button}
              onClick={onClick}
            />
          )}
          <h2 className={styles.formCommon__actionContainer_title}>{title}</h2>
        </div>

        <form
          className={styles.formCommon__form}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            aria-label='Отправить данные'
            className={styles.formCommon__formButton}
            disabled={!isDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default FormCommon;
