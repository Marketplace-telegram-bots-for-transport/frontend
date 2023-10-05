import { useState } from 'react';
import styles from './Payment.module.scss';

function Payment({ totalSum }) {
  const [formValue, setFormValue] = useState({
    email: '',
    number: '',
    month: '',
    year: '',
    code: '',
    promocode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.payment}>
      <div className={styles.payment__content}>
        <h3 className={styles.payment__title}>Платежная информация</h3>
        <form
          action='#'
          className={styles.payment__form}
          onSubmit={handleSubmit}
        >
          <label className={styles.payment__label} htmlFor='email-input'>
            {' '}
            <span className={styles.payment__inputHeading}>
              E-mail для отправки бота и чека
            </span>
            <input
              name='email'
              placeholder='example@yandex.ru'
              type='email'
              id='email-input'
              className={styles.payment__input}
              minLength='2'
              maxLength='30'
              required
            />
          </label>
          <fieldset className={styles.payment__card}>
            <label className={styles.payment__label} htmlFor='number-input'>
              <span className={styles.payment__inputHeading}>
                {' '}
                Номер карты для оплаты
              </span>
              <input
                className={`${styles.payment__input} ${styles.payment__inputNumber}`}
                name='cardNumber'
                placeholder='____-____-____-____'
                autoComplete='cc-number'
                inputMode='numeric'
                type='text'
                id='number-input'
                minLength='16'
                maxLength='16'
                required
                onChange={handleChange}
              />
            </label>
            <div className={styles.payment__cardInfo}>
              <label className={styles.payment__label} htmlFor='number-input'>
                <span className={styles.payment__inputHeading}>
                  Срок действия
                </span>
                <div className={styles.payment__cardDate}>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate}`}
                    name='cardMonth'
                    placeholder='ММ'
                    autoComplete='cc-month'
                    inputMode='numeric'
                    type='text'
                    id='month-input'
                    minLength='2'
                    maxLength='2'
                    required
                    onChange={handleChange}
                  />
                  <span className={styles.payment__cardDateSlash}>/</span>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate}`}
                    name='cardYear'
                    placeholder='ГГГГ'
                    autoComplete='cc-year'
                    inputMode='numeric'
                    type='text'
                    id='year-input'
                    minLength='4'
                    maxLength='4'
                    required
                    onChange={handleChange}
                  />
                </div>
              </label>
              <label
                className={`${styles.payment__label} ${styles.payment__labelCode}`}
                htmlFor='code-input'
              >
                <span className={styles.payment__inputHeading}>
                  Код на обороте
                </span>
                <input
                  className={`${styles.payment__input} ${styles.payment__inputCode}`}
                  name='cardCode'
                  placeholder='CVC'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  type='text'
                  id='code-input'
                  minLength='1'
                  maxLength='3'
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
          </fieldset>
          <p className={styles.payment__totalCount}>Всего: 4 товара</p>
          <input
            className={`${styles.payment__input} ${styles.payment__inputPromocode}`}
            name='cardPromocode'
            placeholder='Промокод'
            type='text'
            id='promocode-input'
            minLength='3'
            maxLength='30'
            required
            onChange={handleChange}
          />
          <div className={styles.payment__total}>
            <p className={styles.payment__sum}>{totalSum} руб.</p>
            <button className={styles.payment__button}>Купить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
