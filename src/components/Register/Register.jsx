import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import logo from '../../images/Logo.svg';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({ loggedIn, onRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const navigate = useNavigate();
  const [type, setType] = React.useState('password');
  const [typeRepeat, setTypeRepeat] = React.useState('password');
  const [passwardEyeClass, setPasswardEyeClass] = React.useState(
    `${styles.register__viewPassword}`
  );
  const [passwardRepeatEyeClass, setPasswardRepeatEyeClass] = React.useState(
    `${styles.register__viewPassword}`
  );

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  function togglePasswardEye() {
    if (type === 'password') {
      setType('text');
      setPasswardEyeClass(`${styles.register__viewPasswordOn}`);
    } else {
      setType('password');
      setPasswardEyeClass(`${styles.register__viewPassword}`);
    }
  }

  function togglePasswardRepeatEye() {
    if (typeRepeat === 'password') {
      setTypeRepeat('text');
      setPasswardRepeatEyeClass(`${styles.register__viewPasswordOn}`);
    } else {
      setTypeRepeat('password');
      setPasswardRepeatEyeClass(`${styles.register__viewPassword}`);
    }
  }

  return (
    <main className={styles.register}>
      <div className={styles.register__titleContainer}>
        <img className={styles.register__image} src={logo} alt='логотип' />
        <h2 className={styles.register__title}>BotDepot</h2>
      </div>
      <h3 className={styles.register__text}>Регистрация</h3>
      <form
        className={styles.register__form}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className={styles.register__inputContainer}>
          <input
            className={styles.register__input}
            placeholder='Логин (латиницей, до 16 символов)'
            type='text'
            id='register'
            name='register'
            required
            pattern='^[a-zA-Zа-яА-Я\s\-]+$'
            maxLength='16'
            minLength='2'
            value={values.register || ''}
            onChange={handleChange}
          />
          <span className={styles.register__error}>{errors.register}</span>
          <div className={styles.register__password}>
            <input
              className={styles.register__input}
              placeholder='Пароль (от 8 до 16 символов)'
              type={type}
              id='password'
              name='password'
              required
              minLength='8'
              maxLength='16'
              value={values.password || ''}
              onChange={handleChange}
            />
            <div
              className={passwardEyeClass}
              onClick={togglePasswardEye}
              onKeyDown={togglePasswardEye}
              role='button'
              tabIndex='0'
              aria-label='key'
            />
          </div>
          <span className={styles.register__error}>{errors.password}</span>
          <div className={styles.register__password}>
            <input
              className={styles.register__input}
              placeholder='Повторите пароль'
              type={typeRepeat}
              id='passwordrepeat'
              name='passwordrepeat'
              required
              value={values.passwordrepeat || ''}
              onChange={handleChange}
            />
            <div
              className={passwardRepeatEyeClass}
              onClick={togglePasswardRepeatEye}
              onKeyDown={togglePasswardRepeatEye}
              role='button'
              tabIndex='0'
              aria-label='key'
            />
          </div>
          <span className={styles.register__error}>Пароли не совпадают</span>
          <input
            className={styles.register__input}
            placeholder='Электронная почта (example@yandex.ru)'
            type='email'
            id='email'
            name='email'
            required
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className={styles.register__error}>{errors.email}</span>
        </div>
        <div className={styles.register__approval}>
          <input
            className={styles.register__checkbox}
            type='checkbox'
            required
            onChange={handleChange}
          />
          <span className={styles.register__label}>
            Согласен на обработку персональных данных
          </span>
        </div>
        <button className={styles.register__button} disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}

export default Register;
