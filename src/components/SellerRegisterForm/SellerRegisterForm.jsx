import styles from './SellerRegisterForm.module.scss';

function SellerRegisterForm() {
  return (
    <div className={styles.seller}>
      <h2 className={styles.seller__title}>Данные продавца/компании</h2>
      <form className={styles.form}>
        <label htmlFor='companyName' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Название компании/ имя продавца
          </span>
          <input
            name='companyName'
            id='companyName'
            type='text'
            placeholder='Это имя будут видеть покупатели'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='sellerName' className={styles.form__label}>
          <span className={styles.form__inputTitle}>ФИО продавца</span>
          <input
            name='sellerName'
            id='sellerName'
            type='text'
            placeholder='Эти данные будет знать только администрация платформы'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='cardNumber' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Реквизиты для платежей
          </span>
          <input
            name='cardNumber'
            id='cardNumber'
            type='text'
            placeholder='0000-0000-0000-0000'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='email' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Электронная почта продавца
          </span>
          <input
            name='email'
            id='email'
            type='email'
            placeholder='Сюда будут приходить чеки об оплате, оповещения'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='passport' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Серия и номер паспорта
          </span>
          <input
            name='passport'
            id='passport'
            type='text'
            placeholder='0000 000000'
            className={styles.form__input}
            required
          />
        </label>
      </form>
    </div>
  );
}

export default SellerRegisterForm;
