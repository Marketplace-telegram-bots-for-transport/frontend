import BackButton from '../BackButton/BackButton';
import SellerRegisterForm from '../SellerRegisterForm/SellerRegisterForm';
// import UserAgreement from '../UserAgreement/UserAgreement';
import styles from './RegisterSeller.module.scss';

function RegisterSeller({ comeBack }) {
  return (
    <section className={styles.register}>
      <div className={styles.register__head}>
        <BackButton currentPageName='Корзина' comeBack={comeBack} />
        <div className={styles.register__headContainer}>
          <h2 className={styles.register__title}>Регистрация продавца</h2>
          <p className={styles.register__text}>
            Шаг 1. Пользовательское соглашение
          </p>
          <div className={styles.slider}>
            <div
              className={`${styles.slider__item} ${styles.slider__item_active}`}
            />
            <div className={`${styles.slider__item}`} />
            <div className={`${styles.slider__item}`} />
          </div>
        </div>
      </div>
      <div className={styles.register__content}>
        {/* <UserAgreement /> */}
        <SellerRegisterForm />
        <button className={styles.register__button}>Продолжить</button>
      </div>
    </section>
  );
}

export default RegisterSeller;
