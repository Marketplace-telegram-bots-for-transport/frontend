import { useState, useEffect } from 'react';
import styles from './AddNewBotForm.module.scss';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddNewBotForm({ bot, deleteBotForm, fillBotForm }) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(bot.logo);

  const changeHandler = (e) => {
    const fileInput = e.target.files[0];
    if (!fileInput.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(fileInput);
    fillBotForm(bot.id, 'logo', URL.createObjectURL(fileInput)); // Используйте URL.createObjectURL для отображения изображения
  };

  useEffect(() => {
    let fileReader;
    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          fillBotForm(bot.id, 'logo', result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, fillBotForm, bot.id]);

  return (
    <div className={styles.form}>
      <label htmlFor='botImage' className={styles.form__label_type_image}>
        <span className={styles.form__logoTitle}>Добавить логотип</span>
        <input
          name='logo'
          id='botImage'
          type='file'
          accept='image/jpeg,image/png'
          className={styles.form__input_type_image}
          onChange={changeHandler}
        />
        {fileDataURL ? (
          <div className={styles.form__logoWrapper}>
            <img src={bot.logo} alt='logo' className={styles.form__logo} />
          </div>
        ) : null}
      </label>
      <fieldset className={styles.form__inputGroup}>
        <label
          htmlFor='productName'
          className={`${styles.form__label} ${styles.form__label_type_name}`}
        >
          <span className={styles.form__inputTitle}>Название товара</span>
          <input
            name='name'
            id='productyName'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label
          htmlFor='productCategory'
          className={`${styles.form__label} ${styles.form__label_type_category}`}
        >
          <span className={styles.form__inputTitle}>Категории товара</span>
          <input
            name='categories'
            id='productCategory'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productPrice' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Цена товара</span>
          <input
            name='price'
            id='productPrice'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productCount' className={styles.form__label}>
          <span className={styles.form__inputTitle}>Количество товара</span>
          <input
            name='count'
            id='productCount'
            type='text'
            placeholder=''
            className={styles.form__input}
            required
          />
        </label>
      </fieldset>
      <label htmlFor='productDesc' className={styles.form__label}>
        <span className={styles.form__inputTitle}>Описание товара</span>
        <input
          name='description'
          id='productDesc'
          type='text'
          placeholder=''
          className={`${styles.form__input} ${styles.form__input_type_desc}`}
          required
        />
      </label>
      <label
        htmlFor='productExamples'
        className={`${styles.form__label} ${styles.form__label_type_exaples}`}
      >
        <span className={styles.form__inputTitle}>Примеры экранов</span>
        <div
          className={`${styles.form__input} ${styles.form__input_type_examplesContainer}`}
        >
          <span className={styles.form__examplesTitle}>
            Прикрепить примеры экранов
          </span>
          <input
            name='examples'
            id='productExamples'
            type='file'
            accept='image/jpeg,image/png'
            placeholder='+ Прикрепить примеры экранов'
            className={`${styles.form__input} ${styles.form__input_type_examples}`}
            required
          />
        </div>
      </label>
      <button
        type='button'
        className={styles.form__deleteBtn}
        onClick={() => deleteBotForm(bot.id)}
      >
        Удалить товар
      </button>
    </div>
  );
}

export default AddNewBotForm;
