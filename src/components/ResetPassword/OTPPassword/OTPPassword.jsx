import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../../context/CurrentUserContext'; /* временное значение */

import styles from './OTPPassword.module.scss';

import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

function OTPPassword({ comeBack }) {
  const navigate = useNavigate();

  const { OTP, setOTP, email } = useContext(CurrentUserContext);
  const { values, handleChange, setIsValid, errors, inputValidities, isValid } =
    useFormAndValidation();

  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const [timerCount, setTimerCount] = useState(5);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [commonError, setCommonError] = useState('');

  /* функция проверки введеных данных и автоматического перехода 
  к следующему инпуту для заполнения */
  const handleInputChange = (e, index) => {
    handleChange(e);
    setOTPinput((prevInput) => {
      const updatedInput = [...prevInput];
      updatedInput[index] = e.target.value;
      return updatedInput;
    });

    const allInputsFilled = OTPinput.every((input) => input !== 0);

    // есть ли следующий инпут и не все ли инпуты уже заполнены
    if (
      e.target.value &&
      index < inputRefs.current.length - 1 &&
      !allInputsFilled
    ) {
      inputRefs.current[index + 1].current.focus();
    }
  };

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
    setTimerCount(5);
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

  // Обнуляем общую ошибку commonError при изменении данных
  useEffect(() => {
    setCommonError('');
  }, [values]);

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

  const inputElements = inputRefs.current.map((ref, index) => (
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
      defaultValue={values[`input${index + 1}`] || ''}
      onChange={(e) => handleInputChange(e, index)}
      onBlur={(e) => {
        handleInputChange(e, index);
        setIsValid(inputValidities[`input${index + 1}`]);
      }}
      required
      ref={ref}
    />
  ));

  return (
    <section className={styles.otp}>
      <div className={styles.otp__container}>
        <div className={styles.otp__title}>
          <button
            className={styles.otp__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={comeBack}
          />
          <h3 className={styles.otp__textTitle}>Восстановления пароля</h3>
        </div>
        <form className={styles.otp__form} noValidate>
          <h3 className={styles.otp__formText}>
            Введите код, присланный на почту {email}
          </h3>
          {inputElements}
          <div className={styles.otp__formInput_errorsContainer}>
            {OTPinput.map(
              (_, index) =>
                !inputValidities[`input${index + 1}`] && (
                  <span
                    // eslint-disable-next-line react/no-array-index-key
                    key={`input-error-${index}`}
                    className={styles.otp__formInput_error}
                  >
                    {errors[`input${index + 1}`]}
                  </span>
                )
            )}
          </div>
          <span className={styles.otp__formInput_error_commonError}>
            {commonError || ''}
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
