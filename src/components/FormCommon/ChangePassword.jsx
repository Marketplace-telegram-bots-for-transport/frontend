/* eslint-disable camelcase */
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
/* import * as userApi from '../../utils/api/userApi'; */
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import accepted from '../../images/accepted-min.svg';

import './FormCommon.module.scss';
import styles from './ChangePassword.module.scss';

import FormCommon from './FormCommon';

function ChangePassword({ comeBack }) {
  const navigate = useNavigate();
  const {
    values,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
    inputValidities,
  } = useFormAndValidation();

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    repeat: false,
  }); // состояние просмотра пароля
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  /* ФУНКЦИЯ ИЗМЕНЕНИЯ ВИДИМОСТИ ПОЛЯ С ПАРОЛЕМ */
  function handlePasswordVisibility(field) {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  /* ФУНКЦИЯ ПРОВЕРКИ ПАРОЛЕЙ НА СОВПАДЕНИЕ */
  const handleCheckMatchPassword = useCallback(() => {
    const match = values.password === values.repeat;
    setPasswordsMatch(match);
    const inputValid = inputValidities.password && inputValidities.repeat;

    if (!match) {
      setErrors({ ...errors, common: 'Пароли не совпадают' });
    } else {
      setErrors('');
    }

    setIsValid(match && inputValid);
  }, [
    values.password,
    values.repeat,
    inputValidities.password,
    inputValidities.repeat,
    setIsValid,
    setErrors,
    errors,
  ]);

  /* ПРОВЕРКА СОВПАДЕНИЙ ПАРОЛЕЙ ПРИ КАЖДОМ ВВОДИМОМ ЗНАЧЕНИИ */
  useEffect(() => {
    handleCheckMatchPassword();
  }, [
    handleCheckMatchPassword,
    values.password,
    values.repeat,
    inputValidities.password,
    inputValidities.repeat,
  ]);

  // Функция для валидации текущего поля при смене фокуса
  const handleBlur = useCallback(() => {
    if (focusedField === 'password') {
      //
    } else if (focusedField === 'repeat') {
      //
    }
  }, [focusedField]);

  // Эффект для запуска валидации при изменении состояния focusedField
  useEffect(() => {
    handleBlur();
  }, [focusedField, handleBlur]);

  /* ФУНКЦИЯ ОТПРАВКИ НОВОГО ПАРОЛЯ НА СЕРВЕР И ОТОБРАЖЕНИЯ ОКНА С УСПЕХОМ СМЕНЫ ПАРОЛЯ */
  function sendNewPassword() {
    handleCheckMatchPassword();

    if (isValid && passwordsMatch) {
      /* логика отправки данных на сервер */
      /*   const { password, repeat } = values;
      console.log('password', password);
      console.log('repeat', repeat);
      userApi
        .setPassword(password, repeat)
        .then((newUserData) => {
          console.log('newUserData', newUserData); */
      setIsPasswordChanged(true);
      /* })
        .catch((error) => console.log(`Произошла ошибка: ${error}`)); */
    }
  }

  return (
    <div style={{ padding: isPasswordChanged ? '260px 0 265px' : '0' }}>
      {isPasswordChanged ? (
        <div className={styles.change__success}>
          <img
            className={styles.change__picture}
            src={accepted}
            alt='Галочка'
          />
          <h3 className={styles.change__title}>Пароль успешно изменен!</h3>
          <button
            className={styles.change__button}
            type='button'
            aria-label='Кнопка вернуться к авторизации'
            onClick={() => navigate('/login')}
          >
            Назад к авторизации
          </button>
        </div>
      ) : (
        <FormCommon
          name='changePassword'
          showBackButton
          onClick={comeBack}
          title='Введите новый пароль'
          onSubmit={() => sendNewPassword()}
          isDisabled={isValid && passwordsMatch}
          buttonText='Сменить пароль'
        >
          <fieldset className={styles.change__fieldset}>
            <label htmlFor='password' className={styles.change__label}>
              <span className={styles.change__subtitle}>Новый пароль</span>
              <input
                className={styles.change__input}
                id='password'
                name='password'
                type={isPasswordVisible.password ? 'text' : 'password'}
                placeholder='Новый пароль (от 8 до 16 символов)'
                defaultValue={values.password || ''}
                minLength={8}
                maxLength={16}
                onFocus={() => setFocusedField('password')}
                onBlur={(e) => {
                  handleChange(e);
                  handleBlur();
                }}
                required
              />
            </label>
            <button
              className={`${styles.change__buttonView} ${
                isPasswordVisible.password
                  ? styles.change__buttonView_open
                  : styles.change__buttonView_close
              }`}
              type='button'
              aria-label='Кнопка скрыть/показать пароль'
              onClick={() => handlePasswordVisibility('password')}
            />
            <span className={styles.change__error}>{errors.password}</span>
          </fieldset>
          <fieldset className={styles.change__fieldset}>
            <label className={styles.change__label} htmlFor='repeat'>
              <span className={styles.change__subtitle}>Повторите пароль</span>
              <input
                className={styles.change__input}
                id='repeat'
                name='repeat'
                type={isPasswordVisible.repeat ? 'text' : 'password'}
                placeholder='Повторите пароль'
                minLength={8}
                maxLength={16}
                defaultValue={values.repeat || ''}
                onFocus={() => setFocusedField('repeat')}
                onBlur={(e) => {
                  handleChange(e);
                  handleBlur();
                }}
                required
              />
            </label>
            <button
              className={`${styles.change__buttonView} ${
                isPasswordVisible.repeat
                  ? styles.change__buttonView_open
                  : styles.change__buttonView_close
              }`}
              type='button'
              aria-label='Кнопка скрыть/показать пароль'
              onClick={() => handlePasswordVisibility('repeat')}
            />
            <span className={styles.change__error}>
              {errors.repeat || errors.common}
            </span>
          </fieldset>
          <button
            className={styles.change__buttonСancel}
            type='button'
            aria-label='Кнопка отменить'
            onClick={() => {
              navigate('/');
            }}
          >
            Отменить
          </button>
        </FormCommon>
      )}
    </div>
  );
}

export default ChangePassword;
