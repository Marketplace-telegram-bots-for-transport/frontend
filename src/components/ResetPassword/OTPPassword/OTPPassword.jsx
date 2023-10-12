import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../../context/CurrentUserContext'; /* временное значение */

import styles from './OTPPassword.module.scss';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

function OTPPassword() {
  const navigate = useNavigate();

  const { OTP, setOTP, email } = useContext(CurrentUserContext);
  const { values, handleChange, isValid, setIsValid, errors } =
    useFormAndValidation();

  const [timerCount, setTimerCount] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [commonError, setCommonError] = useState('');

  /* ФУНКЦИЯ ПОВТОРНОГО ЗАПРОСА ОДНОРАЗОВОГО ПАРОЛЯ + СБРОСА ТАЙМЕР */
  function handleResendOTP(e) {
    e.preventDefault();
    if (disable) {
      return;
    }
    /* КОСТЫЛЬНЫЙ */
    /* генерим новый 6-ти-значный код */
    const randomOTP = Math.floor(Math.random() * 900000 + 100000);
    console.log(randomOTP);
    setOTP(randomOTP);
    setDisable(true);
    setTimerCount(60);
    /* ПРАВИЛЬНЫЙ СПОСОБ
      запрос на сервер 
        ..., {
          OTP: otp,
          email: email,
        })
        .then(() => setDisable(true))
        .then(() => )
        .then(() => setTimerCount(10))
        .catch(console.log)
    */
  }

  /* функция проверки корректности введеного пароля в инпут и фактически отправленного */
  function handleVerfiyOTP(e) {
    e.preventDefault();

    if (parseInt(OTPinput.join(''), 10) === OTP) {
      navigate('/change-password');
      return;
    }
    setIsValid(false);
    setCommonError('Некорректный код');
  }

  /* USEEFFECT ДЛЯ НЕПРЕРЫВНОЙ РАБОТЫ ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА И ОТСЛЕЖИВАНИЕ СОСТОЯНИИ КНОПКИ */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount((lastTimerCount) => {
        // eslint-disable-next-line no-unused-expressions
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <section className={styles.otp}>
      <div className={styles.otp__container}>
        <div className={styles.otp__title}>
          <button
            className={styles.otp__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={() => navigate(-1)}
          />
          <h3 className={styles.otp__textTitle}>Восстановления пароля</h3>
        </div>
        <form className={styles.otp__form} noValidate>
          <h3 className={styles.otp__formText}>
            Введите код, присланный на почту {email}
          </h3>
          {OTPinput.map((value, index) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={`input-${index}`}
              className={`
                ${styles.otp__formInput} 
                ${styles.otp__formInput_number}
              `}
              id={`input${index + 1}`}
              name={`input${index + 1}`}
              type='text'
              pattern='[0-9]'
              placeholder='-'
              maxLength={1}
              value={values[`input${index + 1}`] || ''}
              onChange={(e) => {
                handleChange(e);
                setOTPinput((prevInput) => {
                  const updatedInput = [...prevInput];
                  updatedInput[index] = e.target.value;
                  return updatedInput;
                });
              }}
              required
            />
          ))}
          <div className={styles.otp__formInput_errorsContainer}>
            {OTPinput.map((_, index) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={`input-${index}`}
                className={styles.otp__formInput_error}
              >
                {errors[`input${index + 1}`]}
              </span>
            ))}
          </div>
          <span className={styles.otp__formInput_error_commonError}>
            {commonError}
          </span>
          <button
            className={`${styles.otp__formButton}
            ${
              isValid ? styles.otp__formButton : styles.otp__formButton_disabled
            }
          `}
            type='button'
            aria-label='Кнопка продолжить'
            disabled={!isValid}
            onClick={handleVerfiyOTP}
          >
            Продолжить
          </button>
          <button
            className={`${styles.otp__timeButton}
            ${disable ? styles.otp__timeButton_disable : styles.otp__timeButton}
          `}
            type='submit'
            aria-label='Кнопка отправить новый код'
            onClick={handleResendOTP}
          >
            {disable
              ? `Отправить новый код (${timerCount})`
              : 'Отправить новый код'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default OTPPassword;
