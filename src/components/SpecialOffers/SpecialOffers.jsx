import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем useParams для доступа к параметрам маршрута
import styles from './SpecialOffers.module.scss';
import BackButton from '../BackButton/BackButton';
import BotCard from '../BotCard/BotCard';

import infoBanners from '../../utils/infoBanners.json';

function SpecialOffers({
  comeBack,
  apiBots,
  cartProducts,
  isProductInCart,
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
}) {
  // Используем useParams для извлечения параметра маршрута
  const { banners } = infoBanners;
  const { id } = useParams(); // достаем элементы карточки с ботом с главной страницы
  const IdNumber = parseInt(id, 10); // переделываем в число
  const banner = banners.find((item) => item.id === IdNumber); // Ищем с соответствующим id в JSON-массиве

  const bots = apiBots.results;
  const [specialBot, setSpecialBot] = useState([]);

  const backgroundStyle = {
    background: banner.background,
  };
  const imgStyle = {
    backgroundImage: `url(${banner.imageUrl})`,
  };

  useEffect(() => {
    // Обновляем скидку и устанавливаем новые данные в состояние
    const updatedSpecialBot = bots.map((bot) => {
      const newDis = { ...bot, discount: 10 };
      const discountedPrice = (bot.price * newDis.discount) / 100; // 10% скидка
      const newPrice = bot.price - discountedPrice;
      return { ...bot, price: newPrice };
    });
    setSpecialBot(updatedSpecialBot);
  }, [bots]);

  const handleBuyClick = (item) => {
    addProductToCart(item);
  };

  return (
    <section className={styles.special} style={backgroundStyle}>
      <BackButton comeBack={comeBack} title={banner.title} />
      <h1 className={styles.special__title}>{banner.title}</h1>
      <div className={styles.special__banner} style={imgStyle} />
      <div className={styles.special__listContainer}>
        <ul className={styles.special__list}>
          {specialBot.map((bot) => (
            <li key={bot.id}>
              <BotCard
                mainPhoto={bot.main_photo}
                name={bot.name}
                author={bot.author}
                category={bot.category}
                price={bot.price}
                id={bot.id}
                discount={bot.discount}
                newPrice={bot.newPrice}
                onBuyClick={() => handleBuyClick(bot)}
                isProductInCart={isProductInCart}
                cartProducts={cartProducts}
                increaseProductCount={increaseProductCount}
                decreaseProductCount={decreaseProductCount}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SpecialOffers;
