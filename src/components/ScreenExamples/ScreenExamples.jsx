import React, { useState } from 'react';
import styles from './ScreenExamples.module.scss';
import CardExample from '../CardExample/CardExample';
import cardsData from './CardsArray';
// заменить когда добавят в массив на сервере образцы экранов
function ScreenExamples() {
  // const bots = apiBots.results;
  // console.log(bots);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNextSlide = () => {
    if (currentIndex < cardsData.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.screenExamples}>
      <h2 className={styles.screenExamples__title}>Примеры экранов</h2>
      <div className={styles.screenExamples__container}>
        <button
          className={styles.screenExamples__sliderButtonLeft}
          onClick={handlePrevSlide}
          aria-label='button'
        />
        <div className={styles.screenExamples__cards}>
          {cardsData.slice(currentIndex, currentIndex + 4).map((card) => (
            <CardExample key={card.id} link={card.link} />
          ))}
        </div>
        <button
          className={styles.screenExamples__sliderButtonRight}
          onClick={handleNextSlide}
          aria-label='button'
        />
      </div>
    </div>
  );
}
export default ScreenExamples;
