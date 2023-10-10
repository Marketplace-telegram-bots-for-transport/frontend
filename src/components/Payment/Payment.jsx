import React, { useRef } from 'react'; // Добавим импорт useRef
import InputMask from 'react-input-mask';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import styles from './Payment.module.scss';

function Payment({ totalSum }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const buttonClassName = isValid
    ? `${styles.payment__button} ${styles.payment__button_active}`
    : styles.payment__button;

  // реф для элемента InputMask
  const inputMaskRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка валидности формы для отправки на сервер
    if (isValid) {
      // код для отправки данных
      resetForm();
    }
  };

  // Функция, которая сокращает сообщение об ошибке до 1 предложения в целях экономии места для соответсвия макету
  const handleError = (error) => {
    if (error) {
      const firstSentenceMatch = error.match(/([^.]*)\.\s/);
      if (firstSentenceMatch) {
        const firstSentence = firstSentenceMatch[1];
        return firstSentence;
      }
    }
    return error;
  };

  return (
    <div className={styles.payment}>
      <div className={styles.payment__content}>
        <h3 className={styles.payment__title}>Оплата картой</h3>
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
              value={values.email || ''}
              placeholder='example@yandex.ru'
              type='email'
              id='email-input'
              className={styles.payment__input}
              minLength='2'
              maxLength='30'
              required
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.payment__error}>
                {handleError(errors.email)}
              </span>
            )}
          </label>
          <fieldset className={styles.payment__card}>
            <label className={styles.payment__label} htmlFor='number-input'>
              <span className={styles.payment__inputHeading}>
                {' '}
                Номер карты для оплаты
              </span>
              <React.StrictMode>
                <InputMask
                  ref={inputMaskRef}
                  className={`${styles.payment__input} ${styles.payment__inputNumber}`}
                  name='number'
                  value={values.number || ''}
                  placeholder='____-____-____-____'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  type='text'
                  id='number-input'
                  mask='9999-9999-9999-9999'
                  maskChar={null} // Установите maskChar в null
                  required
                  onChange={handleChange}
                />
              </React.StrictMode>
              {errors.number && (
                <span className={styles.payment__error}>
                  {handleError(errors.number)}
                </span>
              )}
            </label>
            <div className={styles.payment__cardInfo}>
              <label className={styles.payment__label} htmlFor='number-input'>
                <span className={styles.payment__inputHeading}>
                  Срок действия
                </span>
                <div className={styles.payment__cardDate}>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate}`}
                    name='month'
                    value={values.month || ''}
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
                    name='year'
                    value={values.year || ''}
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
                  name='code'
                  value={values.code || ''}
                  placeholder='CVC'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  type='text'
                  id='code-input'
                  minLength='3'
                  maxLength='3'
                  required
                  onChange={handleChange}
                />
              </label>
              {(errors.month || errors.year || errors.code) && (
                <span className={styles.payment__error}>
                  {handleError(errors.month) ||
                    handleError(errors.year) ||
                    handleError(errors.code) ||
                    ''}
                </span>
              )}
            </div>
          </fieldset>
          <p className={styles.payment__totalCount}>Всего: 4 товара</p>
          <input
            className={`${styles.payment__input} ${styles.payment__inputPromocode}`}
            name='promocode'
            value={values.promocode || ''}
            placeholder='Промокод'
            type='text'
            id='promocode-input'
            minLength='3'
            maxLength='30'
            onChange={handleChange}
          />
          <div className={styles.payment__total}>
            <p className={styles.payment__sum}>{totalSum}₽</p>
            <button className={buttonClassName} disabled={!isValid}>
              Купить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payment;
