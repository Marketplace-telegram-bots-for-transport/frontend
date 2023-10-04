import styles from './BotCard.module.scss';

const BotCard = ({ img, name, author, categories, price }) => {
  return (
    <div className={styles.bot}>
      <div className={styles.bot__background}>
        <img className={styles.bot__img} src={img} alt='bot img' />
      </div>
      <div className={styles.bot__brief}>
        <p className={styles.bot__name}>{name}</p>
        <p className={styles.bot__author}>{author}</p>
      </div>
      <div className={styles.bot__categories}>
        {categories.map((category) => (
          <p key={category} className={styles.bot__category}>
            {category}
          </p>
        ))}
      </div>
      <p className={styles.bot__price}>{price}₽</p>
      <div className={styles.bot__buttons}>
        <button
          className={styles.bot__favBtn}
          type='button'
          aria-label='Add-to-favourites'
          aria-hidden='true'
        />
        <button className={styles.bot__buyBtn} type='button' aria-label='Buy'>
          Купить
        </button>
      </div>
    </div>
  );
};

export default BotCard;
