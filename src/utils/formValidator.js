/* ВРЕМЕННАЯ ВАЛИДАЦИЯ */

import { useState } from 'react';

export function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [inputValidities, setInputValidities] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, validity, form } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: e.target.validationMessage,
    });

    setInputValidities({
      ...inputValidities,
      [name]: validity.valid,
    });

    setIsValid(form.checkValidity());
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
    inputValidities,
  };
}

export default useForm;
