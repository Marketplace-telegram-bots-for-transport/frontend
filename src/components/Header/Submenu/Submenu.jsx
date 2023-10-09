import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { products } from '../../../utils/products';

import styles from './Submenu.module.scss';

function Submenu(props) {
  const { isLoggedIn, isLogOut } = props;

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState(products);

  useEffect(() => {
    setCartProducts(products);
  }, []);

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
  function handleDeleteClick(productId) {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
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

  /* функция закрытия сабменю при нажатии на любое место */

  useEffect(() => {
    // Здесь запрос к API для получения данных пользовавтеля
  }, []);

  return (
    <section className={styles.submenu}>
      <div className={styles.submenu__basket}>
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
        <div className={styles.submenu__hidden}>
          <h3 className={styles.submenu__hidden_title}>Корзина</h3>
          {cartProducts.length > 0 ? (
            <>
              <p className={styles.submenu__hidden_subtitle}>
                В вашей корзине: {countText}
              </p>
              {cartProducts.map((product) => (
                <div className={styles.submenu__mini} key={product.id}>
                  <img
                    className={styles.submenu__mini_img}
                    src={product.image}
                    alt='Изображение бота'
                  />
                  <div className={styles.submenu__mini_description}>
                    <h3 className={styles.submenu__mini_title}>
                      {product.name}
                    </h3>
                    <p className={styles.submenu__mini_counter}>
                      {product.count} шт.
                    </p>
                  </div>
                  <h3 className={styles.submenu__mini_price}>
                    {product.price}₽
                  </h3>
                  <button
                    className={styles.submenu__mini_button}
                    type='button'
                    aria-label='Удалить товар'
                    onClick={() => {
                      handleDeleteClick(product.id);
                    }}
                  />
                </div>
              ))}
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
              <Link
                className={styles.submenu__hidden_button_link}
                to='/catalog'
              >
                Перейти к каталогу
              </Link>
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
          onClick={() => toggleSubmenu('profile')}
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
              <div className={styles.submenu__profile_description}>
                <img
                  className={styles.submenu__profile_img}
                  /* src={userAvatarURL} */
                  alt='Изображение пользователя'
                />
                <h3 className={styles.submenu__profile_title}>
                  Имя пользователя{/* {userName} */}
                </h3>
              </div>
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
