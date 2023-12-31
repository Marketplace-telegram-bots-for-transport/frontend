import { useContext /* временное значение */ } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext'; /* временное значение */

import styles from './ResetPassword.module.scss';

import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function PasswordReset({ comeBack }) {
  const navigate = useNavigate();
  const { setOTP, setEmail } = useContext(CurrentUserContext);
  const { values, errors, setIsValid, inputValidities, handleChange } =
    useFormAndValidation();

  const handleBlur = () => {
    setIsValid(inputValidities.email);
  };

  /* ФУНКЦИЯ ГЕНЕРАЦИИ РАНДОМНОГО КОДА С ОТПРАВКОЙ НА ПОЧТУ */
  function createOTP(e) {
    e.preventDefault();

    /* генерим 6-ти-значный код */
    if (inputValidities.email) {
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
        <div className={styles.reset__title}>
          <button
            className={styles.reset__buttonTitle}
            type='button'
            aria-label='Кнопка назад'
            onClick={comeBack}
          />
          <h3 className={styles.reset__textTitle}>Восстановления пароля</h3>
        </div>
        <form className={styles.reset__form} noValidate onSubmit={createOTP}>
          <h3 className={styles.reset__formText}>
            Введите адрес электронной почты вашего аккаунта
          </h3>
          <input
            className={styles.reset__formInput}
            id='email'
            name='email'
            type='email'
            placeholder='Введите эл. почту'
            defaultValue={values.email || ''}
            onBlur={(e) => {
              handleChange(e);
              setEmail(e.target.value);
              handleBlur();
            }}
            required
          />
          {!inputValidities.email && (
            <span className={styles.reset__formInput_error}>
              {errors.email}
            </span>
          )}
          <button
            className={`${styles.reset__formButton}
                ${
                  inputValidities.email
                    ? styles.reset__formButton
                    : styles.reset__formButton_disabled
                }
              `}
            type='submit'
            aria-label='Кнопка отправить'
            disabled={!inputValidities.email}
          >
            Отправить код
          </button>
        </form>
      </div>
    </section>
  );
}

export default PasswordReset;
