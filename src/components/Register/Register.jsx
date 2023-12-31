import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CheckBox from '../CheckBox/CheckBox';

function Register({ loggedIn, onRegister, comeBack }) {
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
    if (values.confirm_password === values.password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values.confirm_password, values.password]);

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
      <div className={styles.register__registerContainer}>
        <div className={styles.register__titleContainer}>
          <button
            aria-label='назад'
            className={styles.register__back}
            onClick={comeBack}
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
            id='username'
            name='username'
            required
            pattern='^[a-zA-Zа-яА-Я\s\-]+$'
            maxLength='16'
            minLength='2'
            value={values.username || ''}
            onChange={handleChange}
          />
          <span className={styles.register__error}>{errors.username}</span>
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
              id='confirm_password'
              name='confirm_password'
              required
              value={values.confirm_password || ''}
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
              values.confirm_password === values.password
                ? ''
                : 'Пароли не совпадают'
            }`}
          </span>
          <CheckBox onChange={handleChange} />
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
