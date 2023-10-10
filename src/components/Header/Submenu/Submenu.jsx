import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Submenu.module.scss';

import pictureBots from '../../../images/bots-min.svg';
import pictureProfile from '../../../images/profile-min.svg';

function Submenu(props) {
  const { isLoggedIn, counterBots, isLogOut } = props;

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  /* const closeSubmenu = () => {
    setIsBasketOpen(false);
    setIsProfileOpen(false);
  };

  const handleOverlayClick = (e) => {
    closeSubmenu();
  };

  const handleEscKey = (e) => {
    if (e.key === 'Escape') {
      closeSubmenu();
    }
  }; 
  
  нужно добавить useEffect на обработку handleEscKey
  */

  /* функция закрытия сабменю поочередно */
  const toggleSubmenu = (type) => {
    if (type === 'basket') {
      setIsProfileOpen(false);
      setIsBasketOpen((prevState) => !prevState);
    } else if (type === 'profile') {
      setIsBasketOpen(false);
      setIsProfileOpen((prevState) => !prevState);
    }
  };

  return (
    <section className={styles.submenu}>
      <div className={styles.submenu__basket}>
        <button
          className={`
            ${styles.submenu__button}
            ${styles.submenu__buttonBasket}
            ${isBasketOpen ? styles.submenu__buttonBasket_open : ''}
            `}
          type='button'
          aria-label='Открыть мини-корзину'
          onClick={() => toggleSubmenu('basket')}
        />
        <p className={styles.submenu__counterBasket}>{counterBots}</p>
      </div>

      {isBasketOpen && (
        <div className={styles.submenu__containerHidden}>
          <h3 className={styles.submenu__hiddenTitle}>Корзина</h3>
          {counterBots > 0 ? (
            <>
              <p className={styles.submenu__hiddenSubtitle}>
                В вашей корзине: {counterBots} товар/ов
              </p>
              {/* отображение самих товаров */}
              <div className={styles.submenu__basketMini}>
                <img
                  className={styles.submenu__basketMini_img}
                  src={pictureBots}
                  alt='Изображение бота'
                />
                <div className={styles.submenu__basketMini_description}>
                  <h3 className={styles.submenu__basketMini_title}>
                    Название бота
                  </h3>
                  <p className={styles.submenu__basketMini_counter}>
                    {counterBots} шт.
                  </p>
                </div>
                <h3 className={styles.submenu__basketMini_price}>0.00₽</h3>
                <button
                  className={styles.submenu__basketMini_button}
                  type='button'
                  aria-label='Удалить товар'
                />
              </div>
              <button
                className={styles.submenu__hiddenButton}
                type='button'
                aria-label='Переход на страницу корзины'
              >
                <Link className={styles.submenu__hiddenButton_link} to='/cart'>
                  Перейти к корзине
                </Link>
              </button>
            </>
          ) : (
            <>
              <p className={styles.submenu__hiddenSubtitle}>
                В вашей корзине нет товаров
              </p>
              <button
                className={styles.submenu__hiddenButton}
                type='button'
                aria-label='Переход на страницу каталога'
              >
                <Link
                  className={styles.submenu__hiddenButton_link}
                  to='/catalog'
                >
                  Перейти к каталогу
                </Link>
              </button>
            </>
          )}
        </div>
      )}

      <div className={styles.submenu__profile}>
        <button
          className={`
          ${styles.submenu__button}
          ${styles.submenu__buttonProfile}
          ${isProfileOpen ? styles.submenu__buttonProfile_open : ''}
          `}
          type='button'
          aria-label='Открыть меню профиля'
          onClick={() => toggleSubmenu('profile')}
        />
      </div>

      {isProfileOpen && (
        <div
          className={`
          ${styles.submenu__containerHidden}
          ${styles.submenu__containerHidden_profile}
          `}
        >
          {isLoggedIn ? (
            <>
              <div className={styles.submenu__hiddenDescription_profile}>
                <img
                  className={styles.submenu__hiddenImg_profile}
                  src={pictureProfile}
                  alt='Изображение пользователя'
                />
                <h3 className={styles.submenu__hiddenTitle_profile}>
                  Имя пользователя
                </h3>
              </div>
              <nav className={styles.submenu__hiddenNavigate_profile}>
                <Link
                  className={styles.submenu__hiddenLink_profile}
                  to='/profile'
                >
                  Мой профиль
                </Link>
                <Link className={styles.submenu__hiddenLink_profile} to='/like'>
                  Избранное
                </Link>
                <Link className={styles.submenu__hiddenLink_profile} to='/FAQ'>
                  FAQ
                </Link>
              </nav>
              <button
                className={`
                ${styles.submenu__hiddenButton}
                ${styles.submenu__hiddenButton_link}
                `}
                type='button'
                aria-label='Выйти из профиля'
                onClick={isLogOut}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <p
                className={`
                ${styles.submenu__hiddenSubtitle}
                ${styles.submenu__hiddenSubtitle_profile}
                `}
              >
                Вы не авторизованы
              </p>
              <button
                className={styles.submenu__hiddenButton}
                type='button'
                aria-label='Войти в профиль'
              >
                <Link className={styles.submenu__hiddenButton_link} to='/login'>
                  Войти
                </Link>
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Submenu;
