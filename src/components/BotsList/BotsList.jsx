import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import * as data from '../../utils/tempcards.json';

const BotsList = () => {
  const { bots } = data;

  return (
    <ul className={styles.bots}>
      {bots.map((bot) => (
        <li key={bot.id}>
          <BotCard
            img={bot.img}
            name={bot.name}
            author={bot.author}
            categories={bot.categories}
            price={bot.price}
          />
        </li>
      ))}
    </ul>
  );
};

export default BotsList;
