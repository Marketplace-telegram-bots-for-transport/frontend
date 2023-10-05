/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import styles from './BotDetails.module.scss';
import DetailsBasket from '../DetailsBasket/DetailsBasket';
import BotHeader from '../BotHeader/BotHeader';
import BotBody from '../BotBody/BotBody';
import Rating from '../Rating/Rating';
import ScreenExamples from '../ScreenExamples/ScreenExamples';

function BotDetails() {
  return (
    <section className={styles.details}>
      <div className={styles.details__mainSection}>
        <BotHeader botName='' />
        <BotBody
          botImage={''}
          botName={''}
          botAuthor={''}
          botDescription={''}
        />
        <ScreenExamples />
        <h2 className={styles.rating__title}>Рейтинг</h2>
        <Rating />
      </div>
      <DetailsBasket botPrice={''} />
    </section>
  );
}
export default BotDetails;
