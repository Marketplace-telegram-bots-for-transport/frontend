import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProfileNavigation.module.scss';
// import CurrentUserContext from '../../context/CurrentUserContext';
import foto from '../../images/Logo.svg';
import userActiv from '../../images/user-activ.svg';
// import user from '../../images/user.svg';

function ProfileNavigation() {
  // const currentUser = React.useContext(CurrentUserContext);
  const { pathname } = useLocation();

  return (
    <main className={styles.profileNavigation}>
      <div className={styles.profileNavigation__profileContainer}>
        <img
          className={styles.profileNavigation__image}
          src={foto}
          alt='фото профиля'
        />
        <h1 className={styles.profileNavigation__name}>Сергей</h1>
      </div>
      <nav className={styles.profileNavigation__navigation}>
        <Link to='/profile' className={styles.profileNavigation__link}>
          <img
            src={userActiv}
            alt='личные данные'
            className={styles.profileNavigation__icon}
          />
          <p
            className={
              pathname === '/profile'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Личные данные
          </p>
        </Link>
        <Link to='/profile' className={styles.profileNavigation__link}>
          <img
            src={userActiv}
            alt='мои покупки'
            className={styles.profileNavigation__icon}
          />
          <p
            className={
              pathname === '/profile'
                ? `${styles.profileNavigation__textLink} ${styles.profileNavigation__textLink_activ}`
                : `${styles.profileNavigation__textLink}`
            }
          >
            Личные данные
          </p>
        </Link>
      </nav>
    </main>
  );
}

export default ProfileNavigation;
