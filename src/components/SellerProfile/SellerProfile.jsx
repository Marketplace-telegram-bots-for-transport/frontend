/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './SellerProfile.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { PATTERN_EMAIL } from '../../utils/constants';

function SellerProfile() {
  const [editButton, setEditButton] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isUsernameError, setIsUsernameError] = React.useState(false);
  const [isCompanyError, setIsCompanyError] = React.useState(false);
  const [isCardError, setIsCardError] = React.useState(false);
  const [isPassportError, setIsPassportError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation({});
  const { currentUser } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    }
  }, [currentUser, setValues]);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
    setEditButton(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditButton(false);
    setIsDisabled(true);
  };

  return (
    <>
      <div className={styles.user__titleContainer}>
        <h2 className={styles.user__title}>Данные продавца</h2>
        {!editButton ? (
          <button
            className={styles.user__button}
            aria-label='редактировать'
            onClick={handleEdit}
          />
        ) : (
          <button
            className={`${styles.user__button} ${styles.user__button_activ}`}
            aria-label='редактировать'
          />
        )}
      </div>
      <form className={styles.user__form} noValidate onSubmit={handleSubmit}>
        <div className={styles.user__inputContainer}>
          <label className={styles.user__text}>
            Название компании / имя продавца
          </label>
          <input
            className={styles.user__input}
            type='text'
            name='companyName'
            id='companyName'
            value={values.companyName || ''}
            disabled={isDisabled}
            onChange={handleChange}
            minLength='2'
            maxLength='30'
            required
            pattern='^[a-zA-Zа-яА-Я\s]+$'
            onBlur={() => {
              setIsCompanyError(true);
            }}
          />
          <span
            className={`${styles.user__error} ${
              isCompanyError && styles.user__errorVisible
            }`}
          >
            {errors.companyName}
          </span>
        </div>
        <div className={styles.user__inputContainer}>
          <label className={styles.user__text}>ФИО продавца</label>
          <input
            className={styles.user__input}
            type='text'
            name='username'
            id='username'
            value={values.username || ''}
            disabled={isDisabled}
            onChange={handleChange}
            minLength='2'
            maxLength='30'
            required
            pattern='^[a-zA-Zа-яА-Я\s]+$'
            onBlur={() => {
              setIsUsernameError(true);
            }}
          />
          <span
            className={`${styles.user__error} ${
              isUsernameError && styles.user__errorVisible
            }`}
          >
            {errors.username}
          </span>
        </div>
        <div className={styles.user__inputContainer}>
          <label className={styles.user__text}>Реквизиты для оплаты</label>
          <input
            className={styles.user__input}
            type='password'
            name='cardNumber'
            id='cardNumber'
            placeholder='0000-0000-0000-0000'
            value={values.cardNumber || ''}
            disabled={isDisabled}
            onChange={handleChange}
            pattern='[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}'
            onBlur={() => {
              setIsCardError(true);
            }}
          />
          <span
            className={`${styles.user__error} ${
              isCardError && styles.user__errorVisible
            }`}
          >
            {errors.cardNumber}
          </span>
        </div>
        <div className={styles.user__inputContainer}>
          <label className={styles.user__text}>Email продавца</label>
          <input
            className={styles.user__input}
            type='email'
            name='email'
            id='email'
            value={values.email || ''}
            disabled={isDisabled}
            onChange={handleChange}
            minLength='2'
            required
            pattern={PATTERN_EMAIL}
            onBlur={() => {
              setIsEmailError(true);
            }}
          />
          <span
            className={`${styles.user__error} ${
              isEmailError && styles.user__errorVisible
            }`}
          >
            {errors.email}
          </span>
        </div>
        <div className={styles.user__inputContainer}>
          <label className={styles.user__text}>Серия и номер паспорта</label>
          <input
            className={styles.user__input}
            type='password'
            name='passport'
            id='passport'
            value={values.passport || ''}
            disabled={isDisabled}
            onChange={handleChange}
            onBlur={() => {
              setIsPassportError(true);
            }}
            minLength='10'
            maxLength='10'
            placeholder='0000 000000'
            pattern='[0-9]{10}'
          />
          <span
            className={`${styles.user__error} ${
              isPassportError && styles.user__errorVisible
            }`}
          >
            {errors.passport}
          </span>
        </div>
        {editButton && (
          <button className={styles.user__buttonEdit} disabled={!isValid}>
            Сохранить изменения
          </button>
        )}
      </form>
      <h2 className={`${styles.user__title} ${styles.user__title_next}`}>
        Мои товары
      </h2>
      <div className={styles.user__noitemsCopntainer}>
        <p className={styles.user__noitems}>
          Вы пока не добавили ни одного товара на платформу
        </p>
        <button
          className={`${styles.user__buttonEdit} ${styles.user__buttonEdit_additem}`}
        >
          Добавить товар
        </button>
      </div>
    </>
  );
}

export default SellerProfile;
