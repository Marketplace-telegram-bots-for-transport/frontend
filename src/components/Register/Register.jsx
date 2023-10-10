import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
// import back from '../../images/Logo.svg';
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
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  React.useEffect(() => {
    if (values.passwordrepeat === values.password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values.passwordrepeat, values.password]);

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

  function goBack() {
    navigate(-1);
  }

  return (
    <main className={styles.register}>
      <div className={styles.register__registerContainer}>
        <div className={styles.register__titleContainer}>
          <button
            aria-label='назад'
            className={styles.register__back}
            onClick={goBack}
          />
          <h2 className={styles.register__title}>Регистрация</h2>
        </div>
        <form
          className={styles.register__form}
          noValidate
          onSubmit={handleSubmit}
        >
          <h3 className={styles.register__inputName}>Логин</h3>
          <input
            className={styles.register__input}
            placeholder='Введите логин'
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
          <h3 className={styles.register__inputName}>E-mail</h3>
          <input
            className={styles.register__input}
            placeholder='Введите e-mail'
            type='email'
            id='email'
            name='email'
            required
            pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className={styles.register__error}>{errors.email}</span>
          <h3 className={styles.register__inputName}>Пароль</h3>
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
          <h3 className={styles.register__inputName}>Повторите пароль</h3>
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
          <span className={styles.register__error}>
            {`${
              values.passwordrepeat === values.password
                ? ''
                : 'Пароли не совпадают'
            }`}
          </span>
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
          <button
            className={styles.register__button}
            disabled={!isValid || isDisabled}
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
