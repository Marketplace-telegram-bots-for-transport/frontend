import styles from './BotCard.module.scss';

const BotCard = ({ name, special }) => {
  return (
    <div className={styles.bot}>
      <p>{name}</p>
      <p>{special}</p>
    </div>
  );
};

export default BotCard;
