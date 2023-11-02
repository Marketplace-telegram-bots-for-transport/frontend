import { useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import styles from './Payment.module.scss';
import PopupWithInfo from '../UI/PopupWithInfo/PopupWithInfo';

function Payment({ totalSum }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [formPayment, setFormPayment] = useState({
    number: '',
    month: '',
    year: '',
    code: '',
    promocode: '',
  });
  const [isPaid, setPaidStatus] = useState(false);
  const buttonClassName = isValid
    ? `${styles.payment__button} ${styles.payment__button_active}`
    : styles.payment__button;

  // Функця маски для номера карты
  const formatCardNumber = (inputValue) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const formattedValue = numericValue.match(/.{1,4}/g);
    // Соединить группы цифр дефисами
    if (formattedValue) {
      return formattedValue.join('-');
    }
    return '';
  };

  // Маска для полей карты
  const handleCardChange = (e, fieldName) => {
    handleChange(e);
    const { value } = e.target;
    const formattedValue =
      fieldName === 'number' ? formatCardNumber(value) : value;
    setFormPayment((prevData) => ({
      ...prevData,
      [fieldName]: formattedValue,
    }));
  };

  // Маска для промокода
  const handlePromocodeChange = (e) => {
    handleChange(e);
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setFormPayment((prevCardInfo) => ({
      ...prevCardInfo,
      promocode: value,
    }));
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка валидности формы для отправки на сервер
    if (isValid) {
      setPaidStatus(true);
      // Сбрасываем все поля
      resetForm();
      setFormPayment({
        number: '',
        month: '',
        year: '',
        code: '',
        promocode: '',
      });
      // спустя три секунды убираем попап об успешной покупке
      setTimeout(() => {
        setPaidStatus(false);
      }, 3000);
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
      <PopupWithInfo isPaid={isPaid} />
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
              maxLength='64'
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
              <input
                className={`${styles.payment__input} ${styles.payment__inputNumber}`}
                name='number'
                value={formPayment.number || ''}
                placeholder='____-____-____-____'
                autoComplete='cc-number'
                inputMode='numeric'
                type='text'
                id='number-input'
                minLength={19}
                maxLength={19}
                required
                onChange={(e) => handleCardChange(e, 'number')}
              />
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
                    value={formPayment.month || ''}
                    placeholder='ММ'
                    autoComplete='cc-month'
                    inputMode='numeric'
                    type='text'
                    id='month-input'
                    minLength='2'
                    maxLength='2'
                    required
                    onChange={(e) => handleCardChange(e, 'month')}
                  />
                  <span className={styles.payment__cardDateSlash}>/</span>
                  <input
                    className={`${styles.payment__input} ${styles.payment__inputDate}`}
                    name='year'
                    value={formPayment.year || ''}
                    placeholder='ГГГГ'
                    autoComplete='cc-year'
                    inputMode='numeric'
                    type='text'
                    id='year-input'
                    minLength='4'
                    maxLength='4'
                    required
                    onChange={(e) => handleCardChange(e, 'year')}
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
                  value={formPayment.code || ''}
                  placeholder='CVC'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  type='text'
                  id='code-input'
                  minLength='3'
                  maxLength='3'
                  required
                  onChange={(e) => handleCardChange(e, 'code')}
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
            value={formPayment.promocode || ''}
            placeholder='Промокод'
            type='text'
            id='promocode-input'
            minLength='2'
            maxLength='6'
            onChange={handlePromocodeChange}
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
