import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../../context/CurrentUserContext'; /* временное значение */

import styles from './OTPPassword.module.scss';

import { useForm } from '../../../utils/formValidator';

function OTPPassword() {
  const navigate = useNavigate();

  const { OTP, setOTP, email } = useContext(CurrentUserContext);

  const { values, handleChange, isValid, setIsValid, errors } = useForm();

  const [timerCount, setTimerCount] = useState(5);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [commonError, setCommonError] = useState('');

  /* ФУНКЦИЯ ПОВТОРНОГО ЗАПРОСА ОДНОРАЗОВОГО ПАРОЛЯ + ТАЙМЕР */
  function resendOTP(e) {
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

  function verfiyOTP(e) {
    e.preventDefault();

    if (parseInt(OTPinput.join(''), 10) === OTP) {
      navigate('/change-password');
      return;
    }
    setIsValid(false);
    setCommonError('Некорректный код');
    // eslint-disable-next-line no-useless-return
    return;
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
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}`}
            id='input1'
            name='input1'
            type='text'
            pattern='[0-9]'
            placeholder='-'
            maxLength={1}
            value={values.input1 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                e.target.value,
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
                OTPinput[4],
                OTPinput[5],
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input1}</span>
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}`}
            id='input2'
            name='input2'
            type='text'
            maxLength={1}
            pattern='[0-9]'
            placeholder='-'
            value={values.input2 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                OTPinput[0],
                e.target.value,
                OTPinput[2],
                OTPinput[3],
                OTPinput[4],
                OTPinput[5],
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input2}</span>
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}`}
            id='input3'
            name='input3'
            type='text'
            maxLength={1}
            pattern='[0-9]'
            placeholder='-'
            value={values.input3 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                e.target.value,
                OTPinput[3],
                OTPinput[4],
                OTPinput[5],
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input3}</span>
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  `}
            id='input4'
            name='input4'
            type='text'
            maxLength={1}
            pattern='[0-9]'
            placeholder='-'
            value={values.input4 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                e.target.value,
                OTPinput[4],
                OTPinput[5],
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input4}</span>
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}`}
            id='input5'
            name='input5'
            type='text'
            maxLength={1}
            pattern='[0-9]'
            placeholder='-'
            value={values.input5 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
                e.target.value,
                OTPinput[5],
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input5}</span>
          <input
            className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}`}
            id='input6'
            name='input6'
            type='text'
            pattern='[0-9]'
            maxLength={1}
            placeholder='-'
            value={values.input6 || ''}
            onChange={(e) => {
              handleChange(e);
              setOTPinput([
                OTPinput[0],
                OTPinput[1],
                OTPinput[2],
                OTPinput[3],
                OTPinput[4],
                e.target.value,
              ]);
            }}
            required
          />
          <span className={styles.otp__formInput_error}>{errors.input6}</span>
          <span className={styles.otp__formInput_error}>{commonError}</span>
          <button
            className={`${styles.otp__formButton}
            ${
              isValid ? styles.otp__formButton : styles.otp__formButton_disabled
            }
          `}
            type='button'
            aria-label='Кнопка продолжить'
            disabled={!isValid}
            onClick={verfiyOTP}
          >
            Продолжить
          </button>
          <button
            className={`${styles.otp__timeButton}
            ${disable ? styles.otp__timeButton_disable : styles.otp__timeButton}
          `}
            type='submit'
            aria-label='Кнопка отправить новый код'
            onClick={(e) => resendOTP(e)}
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
