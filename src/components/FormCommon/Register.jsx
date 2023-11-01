import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.scss';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CheckBox from '../CheckBox/CheckBox';

import './FormCommon.module.scss';

import FormCommon from './FormCommon';

function Register({ loggedIn, onRegister, comeBack }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation({});
  const navigate = useNavigate();
  const [type, setType] = useState('password');
  const [typeRepeat, setTypeRepeat] = useState('password');
  const [passwardEyeClass, setPasswardEyeClass] = useState(
    `${styles.register__viewPassword}`
  );
  const [passwardRepeatEyeClass, setPasswardRepeatEyeClass] = useState(
    `${styles.register__viewPassword}`
  );
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
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
    <FormCommon
      name='register'
      showBackButton
      onClick={comeBack}
      title='Регистрация'
      onSubmit={(e) => handleSubmit(e)}
      isDisabled={isValid && !isDisabled}
      buttonText='Зарегистрироваться'
    >
      <fieldset className={styles.register__fieldset}>
        <label className={styles.register__label} htmlFor='username'>
          <span className={styles.register__subtitle}>Логин</span>
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
        </label>
        <span className={styles.register__error}>{errors.username}</span>
      </fieldset>
      <fieldset className={styles.register__fieldset}>
        <label className={styles.register__label} htmlFor='email'>
          <span className={styles.register__subtitle}>E-mail</span>
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
        </label>
        <span className={styles.register__error}>{errors.email}</span>
      </fieldset>
      <fieldset className={styles.register__fieldset}>
        <label className={styles.register__label} htmlFor='password'>
          <span className={styles.register__subtitle}>Пароль</span>
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
        </label>
        <div
          className={passwardEyeClass}
          onClick={togglePasswardEye}
          onKeyDown={togglePasswardEye}
          role='button'
          tabIndex='0'
          aria-label='key'
        />
        <span className={styles.register__error}>{errors.password}</span>
      </fieldset>

      <fieldset className={styles.register__fieldset}>
        <label className={styles.register__label} htmlFor='confirm_password'>
          <span className={styles.register__subtitle}>Повторите пароль</span>
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
        </label>
        <div
          className={passwardRepeatEyeClass}
          onClick={togglePasswardRepeatEye}
          onKeyDown={togglePasswardRepeatEye}
          role='button'
          tabIndex='0'
          aria-label='key'
        />
        <span className={styles.register__error}>
          {`${
            values.confirm_password === values.password
              ? ''
              : 'Пароли не совпадают'
          }`}
        </span>
      </fieldset>
      <CheckBox onChange={handleChange} />
    </FormCommon>
  );
}

export default Register;
