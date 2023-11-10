import styles from './SuccessBlock.module.scss';
import accepted from '../../images/accepted-min.svg';

function SuccessBlock({ title, textButton }) {
  return (
    <div className={styles.success}>
      <div className={styles.success__container}>
        <img className={styles.success__img} src={accepted} alt='Глалочка' />
        <h3 className={styles.success__title}>{title}</h3>
      </div>
      <button
        className={styles.success__button}
        type='button'
        aria-label={`Кнопка ${textButton}`}
      >
        {textButton}
      </button>
    </div>
  );
}

export default SuccessBlock;
