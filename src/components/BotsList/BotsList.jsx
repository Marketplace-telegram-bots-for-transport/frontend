import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import * as data from '../../utils/tempcards.json';

const BotsList = ({ addProductToCart }) => {
  const { bots } = data;

  const handleBuyClick = (bot) => {
    addProductToCart(bot);
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
            onBuyClick={() => handleBuyClick(bot)}
          />
        </li>
      ))}
    </ul>
  );
};

export default BotsList;
