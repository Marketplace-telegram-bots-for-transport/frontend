import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import * as data from '../../utils/tempcards.json';

const BotsList = () => {
  const { bots } = data;

  const handleBuyClick = () => {
    // TODO: добавление в корзину
  };

  return (
    <ul className={styles.bots}>
      {bots.map((bot) => (
        <li key={bot.id}>
          <BotCard
            mainPhoto={bot.main_photo}
            name={bot.name}
            author={bot.author}
            categories={bot.categories}
            price={bot.price}
            id={bot.id}
            onBuyClick={handleBuyClick}
          />
        </li>
      ))}
    </ul>
  );
};

export default BotsList;
