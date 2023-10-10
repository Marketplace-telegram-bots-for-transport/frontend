import { useState, useEffect } from 'react';
import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import {
  NUMBER_OF_DISPLAYED_BOTS_1920,
  NUMBER_OF_ADDED_DISPLAYED_BOTS_1920,
} from '../../utils/constants';
import * as data from '../../utils/tempcards.json';

const BotsList = ({ addProductToCart }) => {
  const { bots } = data;
  const [displayedBots, setDisplayedBots] = useState([]);
  const [numberOfDisplayedBots, setNumerOfDisplayedBots] = useState(
    NUMBER_OF_DISPLAYED_BOTS_1920
  );
  const botsContainerClass = `${styles.botsContainer} ${
    bots.length <= numberOfDisplayedBots && styles.botsContainer_extraMargin
  }`;
  const moreBtnClass = `${styles.bots__moreBtn} ${
    bots.length <= numberOfDisplayedBots && styles.bots__moreBtn_hidden
  }`;

  useEffect(() => {
    setDisplayedBots(bots.slice(0, numberOfDisplayedBots));
  }, [bots, numberOfDisplayedBots]);

  const handleDisplayMoreClick = () => {
    setNumerOfDisplayedBots(
      numberOfDisplayedBots + NUMBER_OF_ADDED_DISPLAYED_BOTS_1920
    );
  };

  const handleBuyClick = (bot) => {
    addProductToCart(bot);
  };

  return (
    <>
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
              onBuyClick={() => handleBuyClick(bot)}
            />
          </li>
        ))}
      </ul>
      <div className={botsContainerClass} id='bots'>
        <ul className={styles.bots}>
          {displayedBots.map((bot) => (
            <li key={bot.id}>
              <BotCard
                mainPhoto={bot.main_photo}
                name={bot.name}
                author={bot.author}
                category={bot.category}
                price={bot.price}
                id={bot.id}
                onBuyClick={handleBuyClick}
              />
            </li>
          ))}
        </ul>
        <button
          className={moreBtnClass}
          type='button'
          onClick={handleDisplayMoreClick}
        >
          Показать еще ({NUMBER_OF_DISPLAYED_BOTS_1920})
        </button>
      </div>
    </>
  );
};

export default BotsList;
