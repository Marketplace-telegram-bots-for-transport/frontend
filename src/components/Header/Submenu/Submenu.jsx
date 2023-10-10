import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as data from '../../../utils/tempcards.json';
import * as info from '../../../utils/infoUser.json';

import styles from './Submenu.module.scss';

function Submenu(props) {
  const { isLoggedIn, isLogOut } = props;

  const { bots } = data;
  const { users } = info;

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(bots);
  const [userData, setUserData] = useState(users);

  /* ЗАКРЫТИЕ САБМЕНЮ ПРИ КЛИКЕ ВНЕ ПОЛЯ */
  const submenuBasketRef = useRef(null);
  const submenuProfileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        submenuBasketRef.current &&
        !submenuBasketRef.current.contains(event.target)
      ) {
        setIsBasketOpen(false);
      }
      if (
        submenuProfileRef.current &&
        !submenuProfileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  useEffect(() => {
    setCartProducts(bots);
  }, [bots]);

  /* СЧЕТЧИК ТОВАРОВ В КОРЗИНЕ */
  const count = cartProducts.length;
  let countText = '';
  if (count === 1) {
    countText = `${count} товар`;
  } else if (count > 1 && count < 5) {
    countText = `${count} товара`;
  } else {
    countText = `${count} товаров`;
  }

  /* ФУНКЦИЯ УДАЛЕНИЯ ТОВАРОВ В КОРЗИНЕ */
  function handleDeleteClick(botId) {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter((bot) => bot.id !== botId);
      return updatedProducts;
    });
  }

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

  return (
    <section className={styles.submenu}>
      <div className={styles.submenu__basket} ref={submenuBasketRef}>
        <button
          className={`
            ${styles.submenu__button}
            ${styles.submenu__button_basket}
            ${isBasketOpen ? styles.submenu__button_basket_open : ''}
            `}
          type='button'
          aria-label='Открыть мини-корзину'
          onClick={() => toggleSubmenu('basket')}
        />
        {cartProducts.length > 0 ? (
          <p className={styles.submenu__basketCounter}>{count}</p>
        ) : (
          ''
        )}
      </div>

      {isBasketOpen && (
        <div
          className={styles.submenu__hidden}
          id='parentScroll'
          ref={submenuBasketRef}
        >
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
                {/* <Link className={styles.submenu__hiddenButton_link} to='/cart'>
                  Перейти к корзине
                </Link>
                </button> */}
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
                        handleDeleteClick(bot.id);
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
            >
              <Link className={styles.submenu__hidden_button_link} to='/cart'>
                Перейти к корзине
              </Link>
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
                to='catalog'
                smooth
                duration={1000}
              >
                Перейти к каталогу
              </ScrollLink>
            </button>
          )}
        </div>
      )}

      <div className={styles.submenu__profile} ref={submenuProfileRef}>
        <button
          className={`
          ${styles.submenu__button}
          ${styles.submenu__button_profile}
          ${isProfileOpen ? styles.submenu__button_profile_open : ''}
          `}
          type='button'
          aria-label='Открыть меню профиля'
          onClick={() => toggleSubmenu('profile')}
        />
      </div>

      {isProfileOpen && (
        <div
          className={`
          ${styles.submenu__hidden}
          ${styles.submenu__profile_hidden}
          `}
          ref={submenuProfileRef}
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
              >
                <Link
                  className={styles.submenu__hidden_button_link}
                  to='/login'
                >
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
