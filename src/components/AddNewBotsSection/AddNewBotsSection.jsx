import styles from './AddNewBotsSection.module.scss';
import defaultImage from '../../images/default-image-input.png';

function AddNewBotsSection() {
  return (
    <section className={styles.addition}>
      <div className={styles.addition__head}>
        <h2 className={styles.addition__title}>Добавление товара</h2>
        <p className={styles.addition__info}>
          Данный этап можно пропустить. Для этого нажмите кнопку “Продолжить”,
          оставив поля незаполненными.
        </p>
        <button className={styles.addition__addButton}>+ Новый товар</button>
      </div>
      <form className={styles.form}>
        <input name='botImage' type='image' src={defaultImage} alt='botImage' />
        <label htmlFor='productName' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Название товара</span>
          <input
            name='productName'
            id='productyName'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productCategory' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Категории товара</span>
          <input
            name='productCategory'
            id='productCategory'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productPrice' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Цена товара</span>
          <input
            name='productPrice'
            id='productPrice'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productCount' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Количество товара</span>
          <input
            name='productCount'
            id='productCount'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productDesc' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Описание товара</span>
          <input
            name='productDesc'
            id='productDesc'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productExamples' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Примеры экранов</span>
          <input
            name='productExamples'
            id='productExamples'
            type='image'
            alt='botImage'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
      </form>
    </section>
  );
}

export default AddNewBotsSection;
