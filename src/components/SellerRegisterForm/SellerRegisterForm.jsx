import { useState, useEffect } from 'react';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';
import styles from './SellerRegisterForm.module.scss';

function SellerRegisterForm({ changeProgressBar }) {
  const { /* handleChange, errors, */ isValid /* , resetForm  */ } =
    useFormAndValidation();
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );
  const [nextPageOpen, setNextPageOpen] = useState(false);

  const buttonClassName = isValid
    ? `${styles.seller__button} ${styles.seller__button_active}`
    : styles.seller__button;

  // отображение кнопки при размере экрана меньше 768px
  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePage = () => {
    setNextPageOpen(!nextPageOpen);
  };

  return (
    <section className={styles.seller}>
      <h2 className={styles.seller__title}>Данные продавца/компании</h2>
      {nextPageOpen && <AddNewBotsSection />}{' '}
      {showButton ? (
        <form className={styles.form}>
          <label
            htmlFor='companyName'
            className={`${styles.form__label} ${styles.form__label_name}`}
          >
            <span className={styles.form__inputTitle}>
              Название компании/ имя продавца
            </span>
            <input
              name='companyName'
              id='companyName'
              type='text'
              placeholder='Это имя будут видеть покупатели'
              className={styles.form__input}
              required
            />
          </label>
          <label
            htmlFor='sellerName'
            className={`${styles.form__label} ${styles.form__label_fullname}`}
          >
            <span className={styles.form__inputTitle}>ФИО продавца</span>
            <input
              name='sellerName'
              id='sellerName'
              type='text'
              placeholder='Эти данные будет знать только администрация платформы'
              className={styles.form__input}
              required
            />
          </label>
          <label
            htmlFor='cardNumber'
            className={`${styles.form__label} ${styles.form__label_pay}`}
          >
            <span className={styles.form__inputTitle}>
              Реквизиты для платежей
            </span>
            <input
              name='cardNumber'
              id='cardNumber'
              type='text'
              placeholder='_ _ _ _ - _ _ _ _ -_ _ _ _ -_ _ _ _'
              className={styles.form__input}
              required
            />
          </label>
          <label
            htmlFor='email'
            className={`${styles.form__label} ${styles.form__label_email}`}
          >
            <span className={styles.form__inputTitle}>
              Электронная почта продавца
            </span>
            <input
              name='email'
              id='email'
              type='email'
              placeholder='Сюда будут приходить чеки об оплате, оповещения'
              className={styles.form__input}
              required
            />
          </label>
          <label
            htmlFor='passport'
            className={`${styles.form__label} ${styles.form__label_pasport}`}
          >
            <span className={styles.form__inputTitle}>
              Серия и номер паспорта
            </span>
            <input
              name='passport'
              id='passport'
              type='text'
              placeholder='_ _ _ _ - _ _ _ _ _ _'
              className={styles.form__input}
              required
            />
          </label>
          {showButton && (
            <button
              className={buttonClassName}
              /* disabled={!isValid} */
              type='button'
              aria-label='Открыть следующую страницу'
              onClick={togglePage}
            >
              Продолжить
            </button>
          )}
        </form>
      ) : (
        <form className={styles.form}>
          <fieldset className={styles.form__container}>
            <label htmlFor='companyName' className={styles.form__label}>
              <span className={styles.form__inputTitle}>
                Название компании/ имя продавца
              </span>
              <input
                name='companyName'
                id='companyName'
                type='text'
                placeholder='Это имя будут видеть покупатели'
                className={styles.form__input}
                required
              />
            </label>
            <label htmlFor='sellerName' className={styles.form__label}>
              <span className={styles.form__inputTitle}>ФИО продавца</span>
              <input
                name='sellerName'
                id='sellerName'
                type='text'
                placeholder='Эти данные будет знать только администрация платформы'
                className={styles.form__input}
                required
              />
            </label>
            <label htmlFor='cardNumber' className={styles.form__label}>
              <span className={styles.form__inputTitle}>
                Реквизиты для платежей
              </span>
              <input
                name='cardNumber'
                id='cardNumber'
                type='text'
                placeholder='0000-0000-0000-0000'
                className={styles.form__input}
                required
              />
            </label>
            <label htmlFor='email' className={styles.form__label}>
              <span className={styles.form__inputTitle}>
                Электронная почта продавца
              </span>
              <input
                name='email'
                id='email'
                type='email'
                placeholder='Сюда будут приходить чеки об оплате, оповещения'
                className={styles.form__input}
                required
              />
            </label>
            <label htmlFor='passport' className={styles.form__label}>
              <span className={styles.form__inputTitle}>
                Серия и номер паспорта
              </span>
              <input
                name='passport'
                id='passport'
                type='text'
                placeholder='0000 000000'
                className={styles.form__input}
                required
              />
            </label>
          </fieldset>
          <button
            type='submit'
            className={styles.form__button}
            onClick={changeProgressBar}
          >
            Продолжить
          </button>
        </form>
      )}
    </section>
  );
}

export default SellerRegisterForm;
