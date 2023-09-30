import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';

import search from '../../images/search-min.svg';

function Header(props) {
  const { isLoggedIn, isLogOut } = props;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logoContainer}>
          <Link className={styles.header__logoLink} to='/' />
          <h1 className={styles.header__logoTitle}>BotDepot</h1>
        </div>
        <div className={styles.header__search}>
          <form
            className={styles.header__searchForm}
            noValidate
            /* action='' */
          >
            <div className={styles.header__searchField}>
              <img
                className={styles.header__searchFieldImage}
                src={search}
                alt='Знак поиска'
              />
              <input
                className={styles.header__searchFieldInput}
                type='text'
                placeholder='Текст'
              />
            </div>
          </form>
        </div>
        <Submenu isLoggedIn={isLoggedIn} counterBots={7} isLogOut={isLogOut} />
      </div>
    </header>
  );
}

export default Header;
