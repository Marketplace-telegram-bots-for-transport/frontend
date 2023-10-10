/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { useParams } from 'react-router-dom'; // Импортируем useParams для доступа к параметрам маршрута
import styles from './BotDetails.module.scss';
import DetailsBasket from '../DetailsBasket/DetailsBasket';
import BotHeader from '../BotHeader/BotHeader';
import BotBody from '../BotBody/BotBody';
import Rating from '../Rating/Rating';
import ScreenExamples from '../ScreenExamples/ScreenExamples';
import tempcards from '../../utils/tempcards.json'; // Импортируйте ваш JSON

function BotDetails() {
  // Используем useParams для извлечения параметра маршрута (botId)
  // eslint-disable-next-line no-unused-vars
  const { botId } = useParams();
  console.log({ botId });

  const botIdNumber = parseInt(botId, 10);
  console.log({ botIdNumber });

  // Найдите бота с соответствующим id в вашем JSON-массиве
  const bot = tempcards.bots.find((item) => item.id === botIdNumber);
  console.log(bot);

  if (!bot) {
    // Если бот с заданным id не найден, можно отобразить сообщение об ошибке
    return <div>Бот не найден</div>;
  }
  return (
    <section className={styles.details}>
      <div className={styles.details__mainSection}>
        <BotHeader botName={bot.name} />
        <BotBody
          botImage={bot.main_photo}
          botName={bot.name}
          botAuthor={bot.author}
          botDescription={bot.description}
        />
        <ScreenExamples />
        <Rating />
      </div>
      <DetailsBasket botPrice={bot.price} />
    </section>
  );
}
export default BotDetails;
