import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
import styles from './AddNewBotSection.module.scss';
import AddNewBotForm from './AddNewBotForm/AddNewBotForm';

function AddNewBotsSection({ changeProgressBar }) {
  const location = useLocation();
  const [nextPageAddNewBot, setNextPageAddNewBot] = useState(false);
  const [nextPageContinue, setNextPageContinue] = useState(false);
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );

  const [botsFormInfo, setBotsFormInfo] = useState([
    {
      id: 0,
      logo: '',
      name: '',
      categories: [],
      price: '',
      count: '',
      description: '',
      examples: [],
    },
  ]); // Состояние для данных ботов

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

  // функция загрузки логотипа
  const fillBotForm = (id, name, value) => {
    setBotsFormInfo(() => {
      return botsFormInfo.map((bot) => {
        if (bot.id === id) {
          return {
            ...bot,
            [name]: value,
          };
        }
        return bot;
      });
    });
  };

  // Функция добавления новой формы для бота
  const addBotForm = () => {
    setBotsFormInfo((prevValue) => [
      ...prevValue,
      {
        id: botsFormInfo.length,
        logo: '',
        name: '',
        categories: [],
        price: '',
        count: '',
        description: '',
        examples: [],
      },
    ]);
  };

  // Функция удаления формы для бота
  const deleteBotForm = (id) => {
    setBotsFormInfo(() => {
      return botsFormInfo.filter((bot) => bot.id !== id);
    });
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
            {location.pathname === '/signup-seller' && (
              <p className={styles.addition__info}>
                Данный этап можно пропустить. Для этого нажмите кнопку
                “Продолжить”, оставив поля незаполненными.
                <span className={styles.addition__required}>
                  * - обязательные поля
                </span>
              </p>
            )}
            <button
              type='button'
              className={styles.addition__addButton}
              onClick={addBotForm}
            >
              Новый товар
            </button>
          </div>
          <form className={styles.form}>
            {botsFormInfo.map((bot) => (
              <AddNewBotForm
                key={bot.id}
                bot={bot}
                deleteBotForm={deleteBotForm}
                fillBotForm={fillBotForm}
              />
            ))}
            <button
              type='button'
              className={styles.form__submit}
              onClick={changeProgressBar}
            >
              Продолжить
            </button>
          </form>
        </>
      )}
    </section>
  );
}

export default AddNewBotsSection;
