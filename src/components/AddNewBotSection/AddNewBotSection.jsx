import { useLocation } from 'react-router-dom';
import styles from './AddNewBotSection.module.scss';
import AddNewBotForm from './AddNewBotForm/AddNewBotForm';

function AddNewBotsSection() {
  const location = useLocation();
  return (
    <section className={styles.addition}>
      <div className={styles.addition__head}>
        <h2 className={styles.addition__title}>Добавление товара</h2>
        {location.pathname === 'register-seller' && (
          <p className={styles.addition__info}>
            Данный этап можно пропустить. Для этого нажмите кнопку “Продолжить”,
            оставив поля незаполненными.
          </p>
        )}
        <button type='button' className={styles.addition__addButton}>
          + Новый товар
        </button>
      </div>
      <form className={styles.form}>
        <AddNewBotForm />
        {location.pathname === 'add-new-bots' && (
          <button type='submit' className={styles.form__submit}>
            Продолжить
          </button>
        )}
      </form>
    </section>
  );
}

export default AddNewBotsSection;
