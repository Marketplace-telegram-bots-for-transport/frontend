import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';

import logo from '../../images/logo-min.svg';
import search from '../../images/search-min.svg';

function Header(props) {
  const { isLoggedIn } = props;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link className={styles.header__link} to='/'>
          <img className={styles.header__logo} src={logo} alt='Логотип сайта' />
        </Link>
        <div className={styles.header__search}>
          <form
            className={styles.header__search_form}
            noValidate /* action='' */
          >
            <div className={styles.header__search_div}>
              <img src={search} alt='Знак поиска по сайту' />
              <input
                className={styles.header__search_input}
                type='text'
                placeholder='text'
              />
            </div>
          </form>
        </div>
        <Submenu isLoggedIn={isLoggedIn} ounterBots={1} />
      </div>
    </header>
  );
}

export default Header;
