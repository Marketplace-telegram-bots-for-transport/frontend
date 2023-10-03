import {
  useEffect,
  useState,
  useContext /* временное значение */,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { currentUserContext } from '../App/App'; /* временное значение */

import styles from './PasswordReset.module.scss';

import { useForm } from '../../utils/formValidator'; /* временное значение */

function PasswordReset() {
  const [step, setStep] = useState(1);
  const [timerCount, setTimerCount] = useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [commonError, setCommonError] = useState('');

  const navigate = useNavigate();
  const { otp, setOTP, email, setEmail } = useContext(currentUserContext);
  const { values, errors, handleChange, isValid, setIsValid, inputValidities } =
    useForm();

  /* ФУНКЦИЯ КНОПКИ НАЗАД */
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  /* ФУНКЦИЯ ГЕНЕРАЦИИ РАНДОМНОГО КОДА С ОТПРАВКОЙ НА ПОЧТУ */
  function createOTP(e) {
    e.preventDefault();
    if (!isValid) {
      return;
    }

    if (email) {
      const OTP = Math.floor(
        Math.random() * 900000 + 100000
      ); /* генерим 6-ти-значный код */
      console.log(OTP);
      setOTP(OTP);
      setStep(2);

      /* запрос POST на сервер 
      ..., ({
        OTP,
        email: email
      })
      .then(() => navigate('/OTP'))
      .catch(console.log)
    */
      return;
    }
    console.log('Пожалуйста, введите свою почту');
  }

  /* ФУНКЦИЯ ПОВТОРНОГО ЗАПРОСА ОДНОРАЗОВОГО ПАРОЛЯ + ТАЙМЕР */
  function resendOTP(e) {
    e.preventDefault();
    if (disable) {
      return;
    }

    /* КОСТЫЛЬНЫЙ */
    const OTP = Math.floor(
      Math.random() * 900000 + 100000
    ); /* генерим 6-ти-значный код */
    console.log(OTP);
    setOTP(OTP);
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

  /* ПРОВЕРКА КОРРЕКТНОСТИ ОДНОРАЗОВОГО ПАРОЛЯ */
  function verfiyOTP(e) {
    e.preventDefault();

    // eslint-disable-next-line radix
    if (parseInt(OTPinput.join('')) === otp) {
      navigate('/login');
      return;
    }
    setIsValid(false);
    setCommonError('Некорректный код');
    // eslint-disable-next-line no-useless-return
    return;
  }

  /* USEEFFECT ДЛЯ НЕПРЕРЫВНОЙ РАБОТЫ ТАЙМЕРА ОБРАТНОГО ОТСЧЕТА И ОТСЛЕЖИВАНИЕ СОСТОЯНИИ КНОПКИ */
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval = setInterval(() => {
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
    <section className={styles.reset}>
      <div className={styles.reset__container}>
        <div className={styles.reset__containerLogo}>
          <button
            className={styles.reset__buttonLogo}
            type='button'
            aria-label='Кнопка назад'
            onClick={() => handleBack()}
          />
          <Link className={styles.reset__logoLink} to='/' />
          <h1 className={styles.reset__logoTitle}>BotDepot</h1>
        </div>
        <form className={styles.reset__form} noValidate>
          <h2 className={styles.reset__formTitle}>Восстановления пароля</h2>
          {step === 1 && (
            <>
              <h3 className={styles.reset__formSubtitle}>
                Введите адрес электронной почты,
                <br /> к которой привязан аккаунт
              </h3>
              <input
                className={`${styles.reset__formInput} ${
                  inputValidities.email !== undefined &&
                  inputValidities.email !== ''
                    ? styles.reset__formInput_filled
                    : styles.reset__formInput
                }`}
                id='email'
                name='email'
                type='email'
                placeholder='example@yandex.ru'
                value={values.email || ''}
                onChange={(e) => {
                  handleChange(e);
                  setEmail(e.target.value);
                }}
                required
              />
              <span className={styles.reset__formInput_error}>
                {errors.email}
              </span>
              <button
                className={`
                ${
                  isValid
                    ? styles.reset__formButton
                    : styles.reset__formButton_disabled
                }
              `}
                type='submit'
                aria-label='Кнопка отправить'
                disabled={!isValid}
                onClick={(e) => createOTP(e)}
              >
                Отправить код
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h3 className={styles.reset__formSubtitle}>
                Введите код, присланный на почту {email}
              </h3>
              <div className={styles.reset__formInput_container}>
                <input
                  className={`
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input1 !== undefined && values.input1 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input2 !== undefined && values.input2 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input3 !== undefined && values.input3 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input4 !== undefined && values.input4 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input5 !== undefined && values.input5 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                  ${styles.reset__formInput} 
                  ${styles.reset__formInput_number}
                  ${
                    values.input6 !== undefined && values.input6 !== ''
                      ? styles.reset__formInput_filled
                      : styles.reset__formInput_number
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
                <span className={styles.reset__formInput_error}>
                  {commonError}
                </span>
              </div>
              <button
                className={`
                ${
                  isValid
                    ? styles.reset__formButton
                    : styles.reset__formButton_disabled
                }
              `}
                type='submit'
                aria-label='Кнопка продолжить'
                disabled={!isValid}
                onClick={(e) => verfiyOTP(e)}
              >
                Продолжить
              </button>
              <button
                className={`
                ${
                  disable
                    ? styles.reset__timeoutButton_disable
                    : styles.reset__timeoutButton
                }
              `}
                type='submit'
                aria-label='Кнопка отправить новый код'
                onClick={(e) => resendOTP(e)}
              >
                {disable
                  ? `Отправить новый код (${timerCount})`
                  : 'Получить новый код'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default PasswordReset;
