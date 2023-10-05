import { useContext /* временное значение */ } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext'; /* временное значение */

import styles from './ResetPassword.module.scss';

import { useForm } from '../../utils/formValidator'; /* временное значение */

function PasswordReset() {
  const navigate = useNavigate();
  const { setOTP, email, setEmail } = useContext(CurrentUserContext);
  const { values, errors, handleChange, isValid } = useForm();

  /* ФУНКЦИЯ ГЕНЕРАЦИИ РАНДОМНОГО КОДА С ОТПРАВКОЙ НА ПОЧТУ */
  function createOTP(e) {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    /* генерим 6-ти-значный код */
    if (email) {
      const randomOTP = Math.floor(Math.random() * 900000 + 100000);
      setOTP(randomOTP);
      console.log(randomOTP);
      navigate('/OTP-password');

      /* запрос POST на сервер 
      ..., ({
        OTP,
        email: email
      })
      .then(() => navigate('/OTP'))
      .catch(console.log)
    */
      /* return; */
    }
  }

  return (
    <section className={styles.reset}>
      <div className={styles.reset__container}>
        <div className={styles.reset__containerLogo}>
          <button
            className={styles.reset__buttonLogo}
            type='button'
            aria-label='Кнопка назад'
            onClick={() => navigate(-1)}
          />
          <Link className={styles.reset__logoLink} to='/' />
          <h1 className={styles.reset__logoTitle}>BotDepot</h1>
        </div>
        <form className={styles.reset__form} noValidate onSubmit={createOTP}>
          <h2 className={styles.reset__formTitle}>Восстановления пароля</h2>
          <h3 className={styles.reset__formSubtitle}>
            Введите адрес электронной почты,
            <br /> к которой привязан аккаунт
          </h3>
          <input
            className={`${styles.reset__formInput} ${
              values.email !== undefined && values.email !== ''
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
          <span className={styles.reset__formInput_error}>{errors.email}</span>
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
          >
            Отправить код
          </button>
        </form>
      </div>
    </section>
  );
}

export default PasswordReset;
