/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styles from './Rating.module.scss';

function Rating() {
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);
  const [totalRatings, setTotalRatings] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const averageRatingCounter = (arr) => {
    const ratingSum = ratings.reduce((acc, rating, index) => {
      return acc + rating * (index + 1);
    });
    const averageRating = (ratingSum / totalRatings).toFixed(1);
    return averageRating;
  };

  const calculatePercentage = (count) => {
    return (count / totalRatings) * 100;
  };

  const renderRatingBars = () => {
    return [1, 2, 3, 4, 5].map((rating, index) => (
      <div key={rating} className={styles.ratingsCount}>
        <span>{rating}</span>
        <div className={styles.ratingBar}>
          <div
            className={styles.ratingBarInner}
            style={{
              width: `${calculatePercentage(ratings[index])}%`,
            }}
          />
        </div>
      </div>
    ));
  };

  const handleStarClick = (index) => {
    const newRatings = [...ratings];
    newRatings[index] += 1;
    setRatings(newRatings);
    setTotalRatings(totalRatings + 1);
  };

  return (
    <div className={styles.rating__main}>
      <h2 className={styles.rating__title}>Рейтинг</h2>
      <div className={styles.rating}>
        <div className={styles.left}>
          <div className={styles.averageRating}>{averageRatingCounter()}</div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((rating, index) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <span
                key={rating}
                className={`${styles.star} star-${rating}`}
                onClick={() => handleStarClick(index)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className={styles.right}>{renderRatingBars()}</div>
      </div>
    </div>
  );
}

export default Rating;
