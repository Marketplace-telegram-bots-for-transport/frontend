import styles from './BackButton.module.scss';

function BackButton({ botName, comeBack }) {
  return (
    <div className={styles.returnElement}>
      <button className={styles.returnElement__btn} onClick={comeBack}>
        <p className={styles.returnElement__title}>Назад</p>
      </button>
      <p className={styles.returnElement__ref}>
        Главная страница / {botName || 'Корзина'}
      </p>
    </div>
  );
}

export default BackButton;
