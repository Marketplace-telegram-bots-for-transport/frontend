import { Link } from 'react-router-dom';
import styles from './ModalWithAuth.module.scss';

function ModalWithAuth() {
  return (
    <div className={styles.modalAuth}>
      <div className={styles.modalAuth__content}>
        <p className={styles.modalAuth__desc}>
          Для продолжения покупки необходимо авторизоваться
        </p>
        <button className={styles.modalAuth__btn}>
          <Link className={styles.modalAuth__link} to='/login'>
            Перейти к авторизации
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ModalWithAuth;
