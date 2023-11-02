import React, { useState } from 'react';
import styles from './ReviewsSection.module.scss';
import ReviewCard from '../ReviewCard/ReviewCard';

function ReviewsSection({ userImage }) {
  const [reviewText, setReviewText] = useState('');
  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <div className={styles.reviews}>
      <h2 className={styles.reviews__header}>Написать отзыв</h2>
      <div className={styles.reviews}>
        <img
          className={styles.reviews__avatar}
          src={userImage}
          alt='фото юзера'
        />
        <div className={styles.reviews__feedbackSection}>
          <h3 className={styles.reviews__header}>Имя пользователя</h3>
          <textarea
            className={styles.reviews__textarea}
            value={reviewText}
            onChange={handleReviewChange}
            placeholder='Оставить отзыв'
          />
          <div className={styles.reviews__buttonsSection}>
            <button
              className={styles.reviews__addButton}
              type='button'
              aria-label='add button'
            />
            <button
              className={styles.reviews__sendReviewButton}
              type='button'
              aria-label='send button'
            />
          </div>
        </div>
      </div>
      <h2 className={styles.reviews__header}>Отзывы</h2>
      <ReviewCard />
    </div>
  );
}

export default ReviewsSection;
