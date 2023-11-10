import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';
import BackButton from '../BackButton/BackButton';
import SellerRegisterForm from '../SellerRegisterForm/SellerRegisterForm';
import { useWindowSize } from '../../context/WindowSizeContext';
// import UserAgreement from '../UserAgreement/UserAgreement';
import styles from './RegisterSeller.module.scss';

function RegisterSeller({ comeBack }) {
  const isMobile = useWindowSize();

  return (
    <section className={styles.register}>
      {isMobile ? (
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
