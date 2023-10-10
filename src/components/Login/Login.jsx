import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

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
    <main className={styles.login}>
      <div className={styles.login__loginContainer}>
        <h2 className={styles.login__title}>Войдите, чтобы продолжить</h2>
        <form className={styles.login__form} noValidate onSubmit={handleSubmit}>
          <h3 className={styles.login__inputName}>Логин или email</h3>
          <input
            className={styles.login__input}
            placeholder='Логин или email'
            type='text'
            id='login'
            name='login'
            required
            value={values.login || ''}
            onChange={handleChange}
            minLength='2'
          />
          <span className={styles.login__error}>{errors.login}</span>
          <div className={styles.login__inputNameContainer}>
            <h3 className={styles.login__inputName}>Пароль</h3>
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
          <button className={styles.login__button} disabled={!isValid}>
            Войти
          </button>
          <Link to='/signup' className={styles.login__registrLink}>
            Зарегистрироваться
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Login;
