import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroll-component';

import info from '../../../utils/infoUser.json';

import styles from './Submenu.module.scss';

function Submenu({ isLoggedIn, isLogOut, cartProducts, deleteCartProduct }) {
  const { users } = info; // получаем временные данные пользователя

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(users); // состояние данных пользователя
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(users);
  }, [users]);

  /* функции закрытия сабменю поочередно */
  const handleBasketClick = () => {
    setIsBasketOpen(!isBasketOpen);
    setIsProfileOpen(false); // Закрываем профиль при открытии корзины
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsBasketOpen(false); // Закрываем корзину при открытии профиля
  };

  /* функция закрытия сабменю при клике на оверлей */
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsProfileOpen(false);
        setIsBasketOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  /* функция закрытия сабменю при нажатии на esc */
  useEffect(() => {
    function handleEscKeyPress(e) {
      if (e.key === 'Escape') {
        setIsBasketOpen(false);
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscKeyPress);
    return () => {
      document.removeEventListener('keydown', handleEscKeyPress);
    };
  }, []);

  /* функция закрытия сабменю при переходе на новую страницу */
  const handelRedirect = (path) => {
    setIsProfileOpen(false);
    setIsBasketOpen(false);
    navigate(path);
  };

  // функция нахождения общего е=количнства товаров в корзине
  const count = () => {
    const val = cartProducts.reduce((previousValue, product) => {
      return previousValue + product.count;
    }, 0);
    return val;
  };

  /* СЧЕТЧИК ТОВАРОВ В КОРЗИНЕ */
  let countText = '';
  if (count() === 1) {
    countText = `${count()} товар`;
  } else if (count() > 1 && count() < 5) {
    countText = `${count()} товара`;
  } else {
    countText = `${count()} товаров`;
  }

  return (
    <section className={styles.submenu} ref={menuRef}>
      <div className={styles.submenu__basket}>
        <button
          className={`
            ${styles.submenu__button}
            ${styles.submenu__button_basket}
            ${isBasketOpen ? styles.submenu__button_basket_open : ''}
            `}
          type='button'
          aria-label='Открыть мини-корзину'
          onClick={handleBasketClick}
        />
        {cartProducts.length > 0 ? (
          <p className={styles.submenu__basketCounter}>{count()}</p>
        ) : (
          ''
        )}
      </div>

      {isBasketOpen && (
        <div className={styles.submenu__hidden} id='parentScroll'>
          <h3 className={styles.submenu__hidden_title}>Корзина</h3>

          {cartProducts.length > 0 ? (
            <>
              <p className={styles.submenu__hidden_subtitle}>
                В вашей корзине: {countText}
              </p>
              <InfiniteScroll
                className={styles.submenu__hidden_scroll}
                dataLength={cartProducts.length}
                scrollableTarget='parentScroll'
                style={{
                  maxHeight: '250px',
                  overflow: 'auto',
                }}
              >
                {cartProducts.map((bot, index) => (
                  <div
                    className={styles.submenu__mini}
                    key={bot.id}
                    tabIndex={index + 1}
                  >
                    <img
                      className={styles.submenu__mini_img}
                      src={bot.main_photo}
                      alt='Изображение бота'
                    />
                    <div className={styles.submenu__mini_description}>
                      <h3 className={styles.submenu__mini_title}>{bot.name}</h3>
                      <p className={styles.submenu__mini_counter}>
                        {bot.count} шт.
                      </p>
                    </div>
                    <h3 className={styles.submenu__mini_price}>{bot.price}₽</h3>
                    <button
                      className={styles.submenu__mini_button}
                      type='button'
                      aria-label='Удалить товар'
                      onClick={() => {
                        deleteCartProduct(bot.id);
                      }}
                    />
                  </div>
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <p className={styles.submenu__hidden_subtitle}>
              В вашей корзине нет товаров
            </p>
          )}
          {cartProducts.length > 0 && (
            <button
              className={styles.submenu__hidden_button}
              type='button'
              aria-label='Переход на страницу корзины'
              onClick={() => handelRedirect('/cart')}
            >
              Перейти к корзине
            </button>
          )}
          {!cartProducts.length > 0 && (
            <button
              className={styles.submenu__hidden_button}
              type='button'
              aria-label='Переход на страницу каталога'
            >
              <ScrollLink
                className={styles.submenu__hidden_button_link}
                to='bots'
                smooth
                duration={1000}
              >
                Перейти к каталогу
              </ScrollLink>
            </button>
          )}
        </div>
      )}

      <div className={styles.submenu__profile}>
        <button
          className={`
          ${styles.submenu__button}
          ${styles.submenu__button_profile}
          ${isProfileOpen ? styles.submenu__button_profile_open : ''}
          `}
          type='button'
          aria-label='Открыть меню профиля'
          onClick={handleProfileClick}
        />
      </div>

      {isProfileOpen && (
        <div
          className={`
          ${styles.submenu__hidden}
          ${styles.submenu__profile_hidden}
          `}
        >
          {isLoggedIn ? (
            <>
              {userData.map((user) => (
                <div
                  className={styles.submenu__profile_description}
                  key={user.id}
                >
                  <img
                    className={styles.submenu__profile_img}
                    src={user.avatar}
                    alt='Изображение пользователя'
                  />
                  <h3 className={styles.submenu__profile_title}>{user.name}</h3>
                </div>
              ))}
              <nav className={styles.submenu__profile_navigate}>
                <Link className={styles.submenu__profile_link} to='/profile'>
                  Мой профиль
                </Link>
                <Link className={styles.submenu__profile_link} to='/like'>
                  Избранное
                </Link>
                <Link className={styles.submenu__profile_link} to='/FAQ'>
                  FAQ
                </Link>
              </nav>
              <button
                className={`
                ${styles.submenu__hidden_button}
                ${styles.submenu__hidden_button_link}
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
                ${styles.submenu__hidden_subtitle}
                ${styles.submenu__hidden_subtitle_profile}
                `}
              >
                Вы не авторизованы
              </p>
              <button
                className={styles.submenu__hidden_button}
                type='button'
                aria-label='Войти в профиль'
                onClick={() => handelRedirect('/login')}
              >
                Войти
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Submenu;
