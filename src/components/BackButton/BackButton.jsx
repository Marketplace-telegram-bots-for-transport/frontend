import styles from './BackButton.module.scss';

function BackButton() {
  return (
    <div className={styles.returnElement}>
      <button className={styles.returnElement__btn}>
        <p className={styles.returnElement__title}>Назад</p>
      </button>
      <p className={styles.returnElement__ref}>Главная страница / Корзина</p>
    </div>
  );
}

export default BackButton;
