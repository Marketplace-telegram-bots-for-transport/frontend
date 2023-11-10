import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import styles from './AddNewBotSection.module.scss';
import AddNewBotForm from './AddNewBotForm/AddNewBotForm';

function AddNewBotsSection() {
  const location = useLocation();
  const [nextPageAddNewBot, setNextPageAddNewBot] = useState(false);
  const [nextPageContinue, setNextPageContinue] = useState(false);
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );

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

  const togglePageAddNewBot = () => {
    setNextPageAddNewBot(!nextPageAddNewBot);
  };

  const togglePageContinue = () => {
    setNextPageContinue(!nextPageContinue);
  };

  return (
    <section className={styles.addition}>
      {showButton ? (
        <div className={styles.addition__head}>
          <h2 className={styles.addition__title}>Добавление товара</h2>
          <p className={styles.addition__info}>
            Данный этап можно пропустить. Для этого нажмите кнопку “Продолжить”,
            оставив поля незаполненными.
            <span className={styles.addition__required}>
              * - обязательные поля
            </span>
          </p>
          <button
            className={styles.addition__addButton}
            type='button'
            aria-label='Открыть следующую страницу'
            onClick={togglePageAddNewBot}
          >
            Добавить товар
          </button>

          <button
            className={styles.addition__continueButton}
            type='button'
            aria-label='Открыть следующую страницу'
            onClick={togglePageContinue}
          >
            Продолжить
          </button>
          {nextPageAddNewBot && <AddNewBotForm />}
          {nextPageContinue && ''}
        </div>
      ) : (
        <>
          <div className={styles.addition__head}>
            <h2 className={styles.addition__title}>Добавление товара</h2>
            {location.pathname === 'register-seller' && (
              <p className={styles.addition__info}>
                Данный этап можно пропустить. Для этого нажмите кнопку
                “Продолжить”, оставив поля незаполненными.
              </p>
            )}
            <button type='button' className={styles.addition__addButton}>
              + Новый товар
            </button>
          </div>
          <form className={styles.form}>
            <AddNewBotForm />
            {location.pathname === 'add-new-bots' && (
              <button type='submit' className={styles.form__submit}>
                Продолжить
              </button>
            )}
          </form>{' '}
        </>
      )}
    </section>
  );
}

export default AddNewBotsSection;
