import styles from './BackButton.module.scss';

function BackButton() {
  return (
    <div className={styles.returnElement}>
      <div className={styles.returnElement__container}>
        <button
          className={styles.returnElement__btn}
          aria-label='back button'
        />
        <h3 className={styles.returnElement__title}>Главная страница</h3>
      </div>
      <p className={styles.returnElement__ref}>Главная страница / Корзина</p>
    </div>
  );
}

export default BackButton;
