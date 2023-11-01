import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './FormCommon.module.scss';

import FormCommon from './FormCommon';

function Login({ onLogin, loggedIn }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const navigate = useNavigate();
  const [type, setType] = React.useState('password');
  const [passwardEyeClass, setPasswardEyeClass] = React.useState(
    `${styles.login__viewPassword}`
  );

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  function togglePasswardEye() {
    if (type === 'password') {
      setType('text');
      setPasswardEyeClass(`${styles.login__viewPasswordOn}`);
    } else {
      setType('password');
      setPasswardEyeClass(`${styles.login__viewPassword}`);
    }
  }

  return (
    <FormCommon
      name='login'
      title='Войдите, чтобы продолжить'
      onSubmit={(e) => handleSubmit(e)}
      isDisabled={isValid}
      buttonText='Войти'
    >
      <label className={styles.login__label} htmlFor='username'>
        <span className={styles.login__subtitle}>Логин или email</span>
        <input
          className={styles.login__input}
          placeholder='Логин или email'
          type='text'
          id='username'
          name='username'
          required
          value={values.username || ''}
          onChange={handleChange}
          minLength='2'
        />
      </label>
      <span className={styles.login__error}>{errors.username}</span>
      <div className={styles.login__nameContainer}>
        <h3 className={styles.login__subtitle}>Пароль</h3>
        <Link to='/reset-password' className={styles.login__resetLink}>
          Не помню пароль
        </Link>
      </div>
      <div className={styles.login__password}>
        <input
          className={styles.login__input}
          placeholder='Пароль'
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
      <span className={styles.login__error}>{errors.password}</span>
      <Link to='/signup' className={styles.login__registrLink}>
        Зарегистрироваться
      </Link>
    </FormCommon>
  );
}

export default Login;
