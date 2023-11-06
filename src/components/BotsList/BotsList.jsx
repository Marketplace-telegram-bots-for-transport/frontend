import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import BotCard from '../BotCard/BotCard';
import styles from './BotsList.module.scss';
import {
  WIDTH_SCREEN_768,
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
  const navigate = useNavigate();
  const location = useLocation();
  // initial api bots
  const bots = apiBots.results;
  const totalBotsAmount = apiBots.count;
  const [nextBotsUrl, setNextBotsUrl] = useState(apiBots.next);
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  );
  // displayed bots
  const [displayedBots, setDisplayedBots] = useState([]);
  const [numberOfDisplayedBots, setNumerOfDisplayedBots] = useState(
    NUMBER_OF_DISPLAYED_BOTS_1920
  );

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

  const handleScrollLinkClick = () => {
    if (location.pathname === '/') {
      document.getElementById('bots').scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.botsContainer} id='bots'>
      {displayedBots.length === 0 && (
        <div className={styles.emptyList}>
          По вашему запросу ничего не найдено
        </div>
      )}
      <ul className={styles.bots}>
        {displayedBots.map((bot) => (
          <li key={bot.id}>
            <BotCard
              mainPhoto={bot.main_photo}
              name={bot.name}
              author={bot.author}
              discount={bot.discount}
              finalPrice={bot.final_price}
              /* category={bot.categories[0].name} */
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
      {showButton ? (
        <button
          className={styles.bots__backUpBtn}
          type='button'
          aria-label='Вернуться наверх каталога'
        >
          <ScrollLink
            className={styles.submenu__hidden_button_link}
            to='bots'
            smooth
            duration={1000}
            onClick={handleScrollLinkClick}
          >
            Вернуться наверх
          </ScrollLink>
        </button>
      ) : (
        <button
          className={moreBtnClass}
          type='button'
          onClick={handleDisplayMoreClick}
        >
          Показать еще ({NUMBER_OF_DISPLAYED_BOTS_1920})
        </button>
      )}
    </div>
  );
};

export default BotsList;
