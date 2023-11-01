import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import CurrentUserContext from '../../context/CurrentUserContext';
import * as userApi from '../../utils/api/userApi';

import './FormCommon.module.scss';
import styles from './ResetPassword.module.scss';

import FormCommon from './FormCommon';

function PasswordReset({ comeBack }) {
  const navigate = useNavigate();
  const { setOTP, setEmail } = useContext(CurrentUserContext);
  const { values, errors, setIsValid, inputValidities, handleChange } =
    useFormAndValidation();

  const handleBlur = (e) => {
    handleChange(e);
    setEmail(e.target.value);
    setIsValid(inputValidities.email);
  };

  /* ФУНКЦИЯ ГЕНЕРАЦИИ РАНДОМНОГО КОДА С ОТПРАВКОЙ НА ПОЧТУ */
  function createOTP(e) {
    e.preventDefault();

    if (inputValidities.email) {
      const randomOTP = Math.floor(Math.random() * 900000 + 100000);
      const { email } = values;
      console.log('email', email);
      userApi
        .resetPassword(email)
        .then((data) => {
          console.log(data);
          if (data.email) {
            console.log('data.email', data.email);
            setOTP(randomOTP);
            console.log('randomOTP', randomOTP);
            navigate('/OTP-password');
          } else {
            console.log('Ошибка');
          }
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`));
    }
  }

  return (
    <FormCommon
      name='resetPassword'
      showBackButton
      onClick={comeBack}
      title='Восстановления пароля'
      onSubmit={(e) => createOTP(e)}
      isDisabled={inputValidities.email}
      buttonText='Отправить код'
    >
      <label className={styles.reset__label} htmlFor='email'>
        <span className={styles.reset__subtitle}>
          Введите адрес электронной почты вашего аккаунта
        </span>
        <input
          className={styles.reset__input}
          id='email'
          name='email'
          type='email'
          placeholder='Введите эл. почту'
          defaultValue={values.email || ''}
          onBlur={(e) => {
            handleBlur(e);
          }}
          required
        />
      </label>
      {!inputValidities.email && (
        <span className={styles.reset__error}>{errors.email}</span>
      )}
    </FormCommon>
  );
}

export default PasswordReset;
