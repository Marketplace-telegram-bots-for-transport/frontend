import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import accepted from '../../../images/accepted-min.svg';

import styles from './ChangePassword.module.scss';

import { useForm } from '../../../utils/formValidator';

function ChangePassword() {
  const navigate = useNavigate();
  const {
    values,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
    inputValidities,
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // состояние просмотра пароля
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  /* ФУНКЦИЯ ИЗМЕНЕНИЯ ВИДИМОСТИ ПОЛЯ С ПАРОЛЕМ */
  function handlePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  }

  /* ФУНКЦИЯ ПРОВЕРКИ ПАРОЛЕЙ НА СОВПАДЕНИЕ */
  const handleCheckMatchPassword = useCallback(() => {
    const match = values.password === values.repeat;
    setPasswordsMatch(match);
    const inputValid = inputValidities.password && inputValidities.repeat;

    setErrors((prevErrors) => ({
      ...prevErrors,
      repeat: match ? '' : 'Пароли не совпадают',
    }));
    setIsValid(match && inputValid);
  }, [
    values.password,
    values.repeat,
    inputValidities.password,
    inputValidities.repeat,
    setErrors,
    setPasswordsMatch,
    setIsValid,
  ]);

  /* ПРОВЕРКА СОВПАДЕНИЙ ПАРОЛЕЙ ПРИ КАЖДОМ ВВОДИМОМ ЗНАЧЕНИИ */
  useEffect(() => {
    handleCheckMatchPassword();
  }, [handleCheckMatchPassword, values.password, values.repeat]);

  /* ФУНКЦИЯ ОТПРАВКИ НОВОГО ПАРОЛЯ НА СЕРВЕР И ОТОБРАЖЕНИЯ ОКНА С УСПЕХОМ СМЕНЫ ПАРОЛЯ */
  function sendNewPassword() {
    handleCheckMatchPassword();

    if (isValid && passwordsMatch) {
      /* логика отправки данных на сервер */
      setIsPasswordChanged(true);
    }
  }

  return (
    <section className={styles.change}>
      <div className={styles.change__container}>
        {isPasswordChanged ? (
          <>
            <div className={styles.change__containerLogo}>
              <Link className={styles.change__logoLink} to='/' />
              <h1 className={styles.change__logoTitle}>BotDepot</h1>
            </div>
            <div className={styles.change__content}>
              <img
                className={styles.change__picture}
                src={accepted}
                alt='Информационное сообщение:'
              />
              <p className={styles.change__formTitle}>
                Пароль успешно изменен!
              </p>
            </div>
            <button
              className={`
                ${styles.change__formButton}
                ${styles.change__formButton_back}
              `}
              type='button'
              aria-label='Кнопка вернуться к авторизации'
              onClick={() => navigate('/login')}
            >
              Назад к авторизации
            </button>
          </>
        ) : (
          <>
            <div className={styles.change__containerLogo}>
              <button
                className={styles.change__buttonLogo}
                type='button'
                aria-label='Кнопка назад'
                onClick={() => navigate(-1)}
              />
              <Link className={styles.change__logoLink} to='/' />
              <h1 className={styles.change__logoTitle}>BotDepot</h1>
            </div>
            <form
              className={styles.change__form}
              noValidate
              onSubmit={sendNewPassword}
            >
              <h2 className={styles.change__formTitle}>Введите новый пароль</h2>
              <div className={styles.change__inputContainet}>
                <input
                  className={`${styles.change__formInput} ${
                    values.password !== undefined && values.password !== ''
                      ? styles.change__formInput_filled
                      : styles.change__formInput
                  }`}
                  id='password'
                  name='password'
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Новый пароль (от 8 до 16 символов)'
                  value={values.password || ''}
                  minLength={8}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
                <button
                  className={`${styles.change__viewButton} ${
                    isPasswordVisible
                      ? styles.change__viewButton_password_open
                      : styles.change__viewButton_password_close
                  }`}
                  type='button'
                  aria-label='Кнопка скрыть/показать пароль'
                  onClick={handlePasswordVisibility}
                />
              </div>
              <div className={styles.change__inputContainet}>
                <input
                  className={`
                  ${styles.change__formInput} 
                  ${
                    values.repeat !== undefined && values.repeat !== ''
                      ? styles.change__formInput_filled
                      : styles.change__formInput
                  }`}
                  id='repeat'
                  name='repeat'
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Повторите пароль'
                  minLength={8}
                  value={values.repeat || ''}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                />
                <button
                  className={`${styles.change__viewButton} ${
                    isPasswordVisible
                      ? styles.change__viewButton_password_open
                      : styles.change__viewButton_password_close
                  }`}
                  type='button'
                  aria-label='Кнопка скрыть/показать пароль'
                  onClick={handlePasswordVisibility}
                />
              </div>
              <span className={styles.change__formInput_error}>
                {errors.repeat}
              </span>
              <button
                className={`
                  ${
                    isValid && passwordsMatch
                      ? styles.change__formButton
                      : styles.change__formButton_disable
                  }`}
                type='button'
                aria-label='Кнопка сменить пароль'
                disabled={!isValid || !passwordsMatch}
                onClick={sendNewPassword}
              >
                Сменить пароль
              </button>
              <button
                className={styles.change__cancelButton}
                type='button'
                aria-label='Кнопка отменить'
                onClick={() => {
                  navigate('/');
                }}
              >
                Отменить
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default ChangePassword;
