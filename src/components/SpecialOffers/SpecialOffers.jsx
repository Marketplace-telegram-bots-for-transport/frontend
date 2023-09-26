import * as data from '../../utils/tempcards.json';
import BotCard from '../BotCard/BotCard';
import styles from './SpecialOffers.module.scss';

const SpecialOffers = () => {
  const { bots } = data;

  return (
    <section className={styles.specials}>
      <h3 className={styles.specials__title}>Специальные предложения</h3>
      <ul className={styles.specials__list}>
        {bots.map((bot) => (
          <li key={bot.id}>
            <BotCard name={bot.name} special={bot.special} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SpecialOffers;
