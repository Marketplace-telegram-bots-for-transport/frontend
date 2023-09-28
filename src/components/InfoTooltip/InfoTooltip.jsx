import styles from './InfoTooltip.module.scss';

function InfoTooltip(props) {
  const { isOpen, close } = props;

  return (
    <div className={`info ${isOpen ? 'info_opened' : ''}`}>
      <div className={styles.info__container}>
        <button
          className={styles.info__button_close}
          type='button'
          aria-label='Закрыть окно восстановления пароля'
          onClick={close}
        />
        <h2 className={styles.info__title}>Введите адрес электронной почты</h2>
        <form className={styles.info__form} action=''>
          <input
            className={styles.info__input}
            type='text'
            placeholder='example@yandex.ru'
            required
          />
          <button
            /* если поле валидно и заполнено, то кнопка активна, если поле не валидно, 
            то кнопка неактивна и невозжможно нажать на нее */
            className={styles.info__button_active}
            type='submit'
          >
            Отправить
          </button>
        </form>
        <div className={styles.info__timeout}>
          <p className={styles.info__timeout_text}>
            Повторно запросить сброс пароля можно через:
          </p>
          <p className={styles.info__timeout_time}>
            300 секунд {/* таймер обратного отсчета */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
