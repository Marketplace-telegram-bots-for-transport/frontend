import styles from './ModalWithAuth.module.scss';

function ModalWithAuth() {
  return (
    <div className={styles.modalAuth}>
      <div className={styles.modalAuth__content}>
        <p className={styles.modalAuth__desc}>
          Для продолжения покупки необходимо авторизоваться
        </p>
        <button className={styles.modalAuth__btn}>Перейти к авторизации</button>
      </div>
    </div>
  );
}

export default ModalWithAuth;
