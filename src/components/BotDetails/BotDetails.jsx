/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Импортируем useParams для доступа к параметрам маршрута
import styles from './BotDetails.module.scss';
// import DetailsBasket from '../DetailsBasket/DetailsBasket';
// import BotHeader from '../BotHeader/BotHeader';
import BotBody from '../BotBody/BotBody';
import Rating from '../Rating/Rating';
import ScreenExamples from '../ScreenExamples/ScreenExamples';
import Counter from '../Counter/Counter';
import BackButton from '../BackButton/BackButton';
import { fetchBotById } from '../../utils/api/getBotByID';

function BotDetails({
  apiBots,
  cartProducts,
  addProductToCart,
  isProductInCart,
  increaseProductCount,
  decreaseProductCount,
  comeBack,
}) {
  // Используем useParams для извлечения параметра маршрута (botId)
  const botsArray = apiBots.results; // достаем массив с ботами с АПИ
  console.log(botsArray);
  const { botId } = useParams(); // достаем элементы карточки с ботом с главной страницы
  const navigate = useNavigate();
  const [botStatus, setBotStatus] = useState(false); // состояние наличия бота в корзине
  const botIdNumber = parseInt(botId, 10); // переделываем в число
  const bot = botsArray.find((item) => item.id === botIdNumber); // Ищем бота с соответствующим id в JSON-массиве

  console.log(botIdNumber);

  // делаем запрос на получение конкретного бота
  const [currentBotById, setCurrentBotById] = useState(null);

  useEffect(() => {
    async function fetchBotId() {
      const botCardId = await fetchBotById(botIdNumber);
      setCurrentBotById(botCardId);
    }
    fetchBotId(botIdNumber);
  }, [botIdNumber]);

  console.log(currentBotById);

  // Определить состояние кнопки купить в зависимости от наличия бота в корзине
  useEffect(() => {
    if (bot.id && isProductInCart) {
      setBotStatus(isProductInCart(bot.id));
    }
  }, [bot.id, isProductInCart, cartProducts]);

  // добавить в корзину
  const handleBuyClick = (item) => {
    addProductToCart(item);
  };

  const handelRedirect = (path) => {
    navigate(path);
  };

  const counterStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '20px',
    backgroundColor: '$background-white',
    borderRadius: '10px',
    border: '$border-main',
    maxWidth: '205px',
    width: '100%',
    height: '40px',
    padding: '8px 45px',
    boxSizing: 'border-box',
    transition: '0.3s',
    margin: '0 auto 0 65px',
  };

  if (!bot) {
    // Если бот с заданным id не найден, можно отобразить сообщение об ошибке
    return console.log('бот не найден');
  }
  return (
    <section className={styles.details}>
      <div className={styles.details__mainSection}>
        <BackButton botName={bot.name} comeBack={comeBack} />
        <BotBody
          botImage={bot.main_photo}
          botName={bot.name}
          botAuthor={bot.author}
          botCategory={bot.category}
          botDescription={bot.description}
        />
        <ScreenExamples array={bot.photo_examples} />

        <Rating currentBotById />
      </div>
      {/* <DetailsBasket botPrice={bot.price} onClick={} disabled={} /> */}
      <div className={styles.basketSection}>
        <div className={styles.basketSection__basket}>
          <h2 className={styles.basketSection__title}>Цена:</h2>
          <p className={styles.basketSection__totalPrice}>
            <span>{bot.price}</span>&#8381;
          </p>
          {!botStatus ? (
            <button
              className={styles.basketSection__button}
              type='button'
              aria-label='Buy'
              onClick={() => handleBuyClick(bot)}
              disabled={botStatus}
            >
              Добавить в корзину
            </button>
          ) : (
            <>
              <Counter
                product={cartProducts.find((obj) => obj.id === bot.id)}
                increaseProductCount={increaseProductCount}
                decreaseProductCount={decreaseProductCount}
                customStyles={counterStyles}
              />
              <button
                className={styles.basketSection__button}
                type='button'
                aria-label='Cart redirect'
                onClick={() => handelRedirect('/cart')}
              >
                Перейти в корзину
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export default BotDetails;
