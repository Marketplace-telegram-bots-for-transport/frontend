// import { useState, useEffect } from 'react';
import styles from './AddNewBotForm.module.scss';
// import CategoriesCheckbox from './CategoriesCheckbox/CategoriesCheckbox';
// import categories from '../../../utils/categories.json';

// const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddNewBotForm({ bot, deleteBotForm }) {
  return (
    <div className={styles.form}>
      <label htmlFor='botImage' className={styles.form__label_type_image}>
        <input
          name='botImage'
          id='botImage'
          type='file'
          accept='image/jpeg,image/png'
          className={styles.form__input_type_image}
        />
      </label>
      <fieldset className={styles.form__inputGroup}>
        <label
          htmlFor='productName'
          className={`${styles.form__label} ${styles.form__label_type_name}`}
        >
          <span className={styles.form__inputTitle}>Название товара</span>
          <input
            name='productName'
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
            name='productCategory'
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
            name='productPrice'
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
            name='productCount'
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
        <textarea
          name='productDesc'
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
            name='productExamples'
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
        onClick={() => {
          deleteBotForm(bot.id);
        }}
      >
        Удалить товар
      </button>
    </div>
  );
}

export default AddNewBotForm;
