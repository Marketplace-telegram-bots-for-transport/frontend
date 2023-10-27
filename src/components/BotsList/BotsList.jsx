import { useState, useEffect } from 'react';
import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import {
  NUMBER_OF_DISPLAYED_BOTS_1920,
  NUMBER_OF_ADDED_DISPLAYED_BOTS_1920,
} from '../../utils/constants';
import { fetchMoreBots } from '../../utils/api/getBots';

const BotsList = ({
  apiBots,
  cartProducts,
  isProductInCart,
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
}) => {
  // initial api bots
  const bots = apiBots.results;
  const totalBotsAmount = apiBots.count;
  const [nextBotsUrl, setNextBotsUrl] = useState(apiBots.next);

  // displayed bots
  const [displayedBots, setDisplayedBots] = useState([]);
  const [numberOfDisplayedBots, setNumerOfDisplayedBots] = useState(
    NUMBER_OF_DISPLAYED_BOTS_1920
  );

  // add margin when button is hidden
  const botsContainerClass = `${styles.botsContainer} ${
    bots.length <= numberOfDisplayedBots && styles.botsContainer_extraMargin
  }`;

  // button display/hide
  const moreBtnClass = `${styles.bots__moreBtn} ${
    totalBotsAmount <= numberOfDisplayedBots && styles.bots__moreBtn_hidden
  }`;

  // change number of displayed bots when array is changed
  useEffect(() => {
    setDisplayedBots(bots.slice(0, numberOfDisplayedBots));
  }, [bots, numberOfDisplayedBots]);

  // "more" button click
  const handleDisplayMoreClick = () => {
    if (nextBotsUrl) {
      fetchMoreBots(nextBotsUrl)
        .then((nextBots) => {
          apiBots.results.push(...nextBots.results);
          setNextBotsUrl(nextBots.next);
          setNumerOfDisplayedBots(
            numberOfDisplayedBots + NUMBER_OF_ADDED_DISPLAYED_BOTS_1920
          );
        })
        .catch((error) => {
          console.error('Error fetching more bots:', error);
        });
    }
  };

  // buy button click
  const handleBuyClick = (bot) => {
    addProductToCart(bot);
  };

  return (
    <div className={botsContainerClass} id='bots'>
      <ul className={styles.bots}>
        {displayedBots.map((bot) => (
          <li key={bot.id}>
            <BotCard
              mainPhoto={bot.main_photo}
              name={bot.name}
              author={bot.author}
              category={bot.categories[0].name}
              price={bot.price}
              id={bot.id}
              onBuyClick={() => handleBuyClick(bot)}
              isProductInCart={isProductInCart}
              cartProducts={cartProducts}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
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
  );
};

export default BotsList;
