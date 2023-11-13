import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Favourites.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { useWindowSize } from '../../context/WindowSizeContext';

function Favourites({ onLogout }) {
  const isMobile = useWindowSize();
  const navigate = useNavigate();

  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      {isMobile ? (
        <>
          <h2 className={styles.favourites__title}>Избранное</h2>
          <section className={styles.favourites}>
            <div className={styles.favourites__container}>
              <p className={styles.favourites__subtitle}>
                В списке избранного пока ничего нет.
              </p>
              <p className={styles.favourites__subtitle}>
                Добавьте понравившиеся товары из каталога!
              </p>
              <button
                className={styles.favourites__button}
                onClick={() => navigate('/')}
              >
                Перейти в каталог
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.favourites}>
          <h2 className={styles.favourites__title}>Избранное</h2>

          <div className={styles.favourites__container}>
            <p className={styles.favourites__subtitle}>
              В списке избранного пока ничего нет. Добавьте понравившиеся товары
              из каталога!
            </p>
            <button
              className={styles.favourites__button}
              onClick={() => navigate('/')}
            >
              Перейти в каталог
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default Favourites;
