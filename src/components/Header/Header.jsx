import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';

function Header({
  isLoggedIn,
  isLogOut,
  cartProducts,
  deleteCartProduct,
  onSearch,
}) {
  const [searchQuery, setSearchQuery] = useState(''); // данные в поисковой строке

  function handleSubmit(e) {
    e.preventDefault();

    onSearch(searchQuery);
  }

  function handleСhange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link className={styles.header__logo_link} to='/'>
            <h2 className={styles.header__logo_title}>BotDepot</h2>
          </Link>
        </div>
        <div className={styles.header__search}>
          <form
            className={styles.header__search_form}
            noValidate
            onSubmit={handleSubmit}
          >
            <input
              className={styles.header__search_input}
              type='text'
              placeholder='Поиск'
              value={searchQuery || ''}
              onChange={handleСhange}
            />
            <button
              className={styles.header__search_button}
              type='submit'
              aria-label='Отправить запрос поиска'
            />
          </form>
        </div>
        <Submenu
          isLoggedIn={isLoggedIn}
          isLogOut={isLogOut}
          cartProducts={cartProducts}
          deleteCartProduct={deleteCartProduct}
        />
      </div>
    </header>
  );
}

export default Header;
