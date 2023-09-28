import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Submenu.module.scss';

function Submenu(props) {
  const { isLoggedIn, counterBots } = props;

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  function onClickBasket() {
    setIsBasketOpen((prevState) => !prevState);
  }

  function onClickProfile() {
    setIsProfileOpen((prevState) => !prevState);
  }

  /* @TODO реализовать функцию закрытия submenu при открытии другого,
    а так же реализовать закрытие submenu при клике на оверлей и при нажатии кнопки esc
  */

  return (
    <section className={styles.submenu}>
      <div className={styles.submenu__container_basket_account}>
        <div className={styles.submenu__basket}>
          <button
            className={styles.submenu__basket_button}
            type='button'
            aria-label='Кнопка корзины'
            onClick={onClickBasket}
          />
          <p className={styles.submenu__basket_counter}>{counterBots}</p>
        </div>

        {isBasketOpen && (
          <div className={styles.submenu__basket_hiding}>
            {counterBots > 0 ? (
              <>
                <span>Товары в корзине</span>
                <Link
                  className={styles.submenu__basket_hiding_link}
                  to='/basket'
                >
                  Перейти к корзине
                </Link>
              </>
            ) : (
              <>
                <span>Корзина пуста</span>
                <Link
                  className={styles.submenu__basket_hiding_link}
                  to='/basket'
                >
                  Перейти к каталогу
                </Link>
              </>
            )}
          </div>
        )}

        <div className={styles.submenu__profile}>
          <button
            className={styles.submenu__profile_button}
            type='button'
            aria-label='Открыть меню профиля'
            onClick={onClickProfile}
          />
        </div>

        {isProfileOpen && (
          <div className={styles.submenu__profile_hiding}>
            {isLoggedIn ? (
              <>
                <ul>
                  <li>
                    <Link
                      className={styles.submenu__basket_hiding_link}
                      target='_blank'
                      to='/profile'
                    >
                      Мой профиль
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.submenu__basket_hiding_link}
                      target='_blank'
                      to='/like'
                    >
                      Избранное
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.submenu__basket_hiding_link}
                      target='_blank'
                      to='/FAQ'
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
                <button
                  className={styles.submenu__profile_logout}
                  type='button'
                  aria-label='Выйти из профиля'
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link className={styles.submenu__basket_hiding_link} to='/login'>
                Войти
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Submenu;
