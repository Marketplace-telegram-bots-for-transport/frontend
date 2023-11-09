import { useState, useEffect } from 'react';
import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';
import BackButton from '../BackButton/BackButton';
import SellerRegisterForm from '../SellerRegisterForm/SellerRegisterForm';
import { WIDTH_SCREEN_768 } from '../../utils/constants';
// import UserAgreement from '../UserAgreement/UserAgreement';
import styles from './RegisterSeller.module.scss';

function RegisterSeller({ comeBack }) {
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );

  // отображение кнопки при размере экрана меньше 768px
  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section className={styles.register}>
      {showButton ? (
        <div className={styles.register__content}>
          <div className={styles.register__head}>
            <BackButton comeBack={comeBack} />
            <div className={styles.register__headContainer}>
              <p className={styles.register__text}>
                Шаг 1. Пользовательское соглашение
              </p>
              <div className={styles.progress}>
                <div
                  className={`${styles.progress__item} ${styles.progress__item_active}`}
                />
                <div className={`${styles.progress__item}`} />
                <div className={`${styles.progress__item}`} />
              </div>
            </div>
          </div>

          {/* <UserAgreement /> */}
          <SellerRegisterForm />
        </div>
      ) : (
        <>
          <div className={styles.register__head}>
            <BackButton comeBack={comeBack} />
            <div className={styles.register__headContainer}>
              <h2 className={styles.register__title}>Регистрация продавца</h2>
              <p className={styles.register__text}>
                Шаг 1. Пользовательское соглашение
              </p>
              <div className={styles.progress}>
                <div
                  className={`${styles.progress__item} ${styles.progress__item_active}`}
                />
                <div className={`${styles.progress__item}`} />
                <div className={`${styles.progress__item}`} />
              </div>
            </div>
          </div>
          <div className={styles.register__content}>
            {/* <UserAgreement /> */}
            <SellerRegisterForm />
            <AddNewBotsSection />
            <button className={styles.register__button}>Продолжить</button>
          </div>
        </>
      )}
    </section>
  );
}

export default RegisterSeller;
