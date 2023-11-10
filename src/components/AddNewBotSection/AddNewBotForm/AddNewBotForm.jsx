import { useState, useEffect } from 'react';
import styles from './AddNewBotForm.module.scss';
// import CategoriesCheckbox from './CategoriesCheckbox/CategoriesCheckbox';
// import categories from '../../../utils/categories.json';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function AddNewBotForm({ bot, deleteBotForm, fillBotForm }) {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(bot.logo);
  const [categContainer, setCategContainer] = useState(false); // состояние окна категорий
  // const [categoriesStatus, setCategoriesStatus] = useState([]);

  // useEffect(() => {
  //   setCategoriesStatus(() => {
  //     return categories.categories.map((categorie) => {
  //       return {
  //         ...categorie,
  //         checked: false,
  //       };
  //     });
  //   });
  // }, []);

  // const handleCheckbox = (idx) => {
  //   console.log(idx);
  //   setCategoriesStatus(() => {
  //     return categoriesStatus.map((categorie, index) => {
  //       if (index === idx) {
  //         return {
  //           ...categorie,
  //           checked: !categorie.checked,
  //         };
  //       }
  //       return categorie;
  //     });
  //   });
  // };

  // Открытие и закрытие окна категорий
  const handleCategContainer = () => {
    setCategContainer(!categContainer);
  };

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
          <span className={styles.form__inputTitle}>
            Название<span className={styles.form__required}>*</span>
          </span>
          <input
            name='name'
            id='productyName'
            type='text'
            placeholder='Укажите название вашего товара'
            className={styles.form__input}
            required
          />
        </label>
        <label
          htmlFor='productCategory'
          className={`${styles.form__label} ${styles.form__label_type_category}`}
        >
          <span className={styles.form__inputTitle}>
            Категории товара<span className={styles.form__required}>*</span>
          </span>
          <button
            type='button'
            aria-label='categorie'
            className={`${styles.categories__button}`}
            onClick={handleCategContainer}
          >
            Не выбрано
          </button>

          {/* {categContainer && (
            <div
              className={`${styles.categories} ${styles.categories_type_open}`}
            >
              <button
                aria-label='categorie'
                className={`${styles.categories__button} ${styles.categories__button_type_open}`}
                onClick={handleCategContainer}
              >
                Категории
              </button>
              <div
                className={`${styles.categories__buttonIcon} ${styles.categories__buttonIcon_type_open}`}
              />
              <label
                htmlFor='search'
                className={categContainer && styles.categories__label}
              >
                <button
                  aria-label='search'
                  type='button'
                  className={styles.categories__searchBtn}
                />
                <input
                  id='search'
                  name='search'
                  placeholder='Поиск по категориям'
                  className={styles.categories__search}
                />
              </label>
              <ul className={styles.categories__list}>
                {categories.categories.map((categorie) => (
                  <CategoriesCheckbox
                    key={categorie.id}
                    idx={categories.id}
                    categorie={categorie}
                    checked={categorie.checked}
                    handleCheckbox={handleCheckbox}
                  />
                ))}
              </ul>
            </div>
          )} */}
          {/* ${styles.categories_type_notChosen} ${styles.categories_type_chosen} */}
          <div className={`${styles.categories__buttonIcon}`} />
        </label>
        <label htmlFor='productPrice' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Цена товара<span className={styles.form__required}>*</span>
          </span>
          <input
            name='price'
            id='productPrice'
            type='text'
            placeholder='₽'
            className={styles.form__input}
            required
          />
        </label>
        <label htmlFor='productCount' className={styles.form__label}>
          <span className={styles.form__inputTitle}>
            Количество товара<span className={styles.form__required}>*</span>
          </span>
          <input
            name='count'
            id='productCount'
            type='text'
            placeholder='шт.'
            className={styles.form__input}
            required
          />
        </label>
      </fieldset>
      <label htmlFor='productDesc' className={styles.form__label}>
        <span className={styles.form__inputTitle}>Описание товара</span>
        <textarea
          name='description'
          id='productDesc'
          placeholder='Введите описание товара, опишите принцип действия бота и т.п.'
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
