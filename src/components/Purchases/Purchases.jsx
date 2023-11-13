import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Purchases.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { useWindowSize } from '../../context/WindowSizeContext';

function Purchases({ onLogout }) {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      {isMobile ? (
        <>
          <h2 className={styles.purchases__title}>Мои покупки</h2>
          <section className={styles.purchases}>
            <div className={styles.purchases__container}>
              <p className={styles.purchases__subtitle}>
                История покупок пока что пустая.
              </p>
              <p className={styles.purchases__subtitle}>
                Приобретите бота из каталога и здесь отобразится ваша история
                покупок!
              </p>
              <button
                className={styles.purchases__button}
                onClick={() => navigate('/')}
              >
                Перейти в каталог
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.purchases} />
      )}
    </main>
  );
}

export default Purchases;
