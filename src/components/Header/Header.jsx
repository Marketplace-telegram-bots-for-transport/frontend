import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import Submenu from './Submenu/Submenu';

function Header(props) {
  const { isLoggedIn, isLogOut } = props;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logoContainer}>
          <Link className={styles.header__logoLink} to='/' />
          <h2 className={styles.header__logoTitle}>BotDepot</h2>
        </div>
        <div className={styles.header__search}>
          <form className={styles.header__searchForm} noValidate>
            <input
              className={styles.header__searchFieldInput}
              type='text'
              placeholder='Текст'
            />
          </form>
        </div>
        <Submenu isLoggedIn={isLoggedIn} counterBots={7} isLogOut={isLogOut} />
      </div>
    </header>
  );
}

export default Header;
