import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../../context/CurrentUserContext'; /* временное значение */

import styles from './OTPPassword.module.scss';

import { useForm } from '../../../utils/formValidator';

function OTPPassword() {
  const navigate = useNavigate();

  const { OTP, setOTP, email } = useContext(CurrentUserContext);

  const { values, handleChange, isValid, setIsValid } = useForm();

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
        <div className={styles.otp__containerLogo}>
          <button
            className={styles.otp__buttonLogo}
            type='button'
            aria-label='Кнопка назад'
            onClick={() => navigate(-1)}
          />
          <Link className={styles.otp__logoLink} to='/' />
          <h1 className={styles.otp__logoTitle}>BotDepot</h1>
        </div>
        <form className={styles.otp__form} noValidate>
          <h2 className={styles.otp__formTitle}>Восстановления пароля</h2>
          <h3 className={styles.otp__formSubtitle}>
            Введите код, присланный на почту {email}
          </h3>
          <div className={styles.otp__formInput_container}>
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input1 !== undefined && values.input1 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }`}
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
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input2 !== undefined && values.input2 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }`}
              id='input2'
              name='input2'
              type='text'
              maxLength={1}
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
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input3 !== undefined && values.input3 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }`}
              id='input3'
              name='input3'
              type='text'
              maxLength={1}
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
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input4 !== undefined && values.input4 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }`}
              id='input4'
              name='input4'
              type='text'
              maxLength={1}
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
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input5 !== undefined && values.input5 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }`}
              id='input5'
              name='input5'
              type='text'
              maxLength={1}
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
            <input
              className={`
                  ${styles.otp__formInput} 
                  ${styles.otp__formInput_number}
                  ${
                    values.input6 !== undefined && values.input6 !== ''
                      ? styles.otp__formInput_filled
                      : styles.otp__formInput_number
                  }
                    `}
              id='input6'
              name='input6'
              type='text'
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
          </div>
          <span className={styles.otp__formInput_error}>{commonError}</span>
          <button
            className={`
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
            className={`
            ${
              disable
                ? styles.otp__timeoutButton_disable
                : styles.otp__timeoutButton
            }
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
