import { Link } from 'react-router-dom';
import styles from './BotCard.module.scss';

const BotCard = ({
  mainPhoto,
  name,
  author,
  category,
  price,
  onBuyClick,
  id,
}) => {
  return (
    <div className={styles.bot}>
      <div className={styles.bot__background}>
        <Link to={`/botdetails/${id}`}>
          {/* Используем Link для перехода */}
          <img className={styles.bot__img} src={mainPhoto} alt='bot img' />
        </Link>
      </div>
      <div className={styles.bot__brief}>
        <p className={styles.bot__name}>{name}</p>
        <p className={styles.bot__author}>{author}</p>
      </div>
      <div className={styles.bot__categories}>
        <p className={styles.bot__category}>{category}</p>
      </div>
      <p className={styles.bot__price}>{price}₽</p>
      <div className={styles.bot__buttons}>
        <button
          className={styles.bot__favBtn}
          type='button'
          aria-label='Add-to-favourites'
          aria-hidden='true'
        />
        <button
          className={styles.bot__buyBtn}
          type='button'
          aria-label='Buy'
          onClick={onBuyClick}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default BotCard;
