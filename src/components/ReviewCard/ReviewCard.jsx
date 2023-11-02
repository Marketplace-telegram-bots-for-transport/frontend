import React, { useState } from 'react';
import styles from './ReviewCard.module.scss';

function ReviewCard({ userName, reviewDate, feedbackText }) {
  const [reviewText, setReviewText] = useState('');
  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  return (
    <div className={styles.reviewCard__section}>
      <div className={styles.reviewCard__headerSection}>
        <img className={styles.reviewCard__userImg} alt='Фото пользователя' />
        <div className={styles.reviewCard__nameSection}>
          <p className={styles.reviewCard__name}>{userName}Анна</p>
          <p className={styles.reviewCard__date}>{reviewDate}09.10.2023</p>
        </div>
        <div className={styles.reviewCard__ratingBar} />
      </div>
      <p className={styles.reviewCard__reviewText}>{feedbackText}</p>
      <div className={styles.reviewCard__likeFeedbackSection}>
        <button
          className={styles.reviewCard__likeButton}
          type='button'
          aria-label='like button'
        />
        <button
          className={styles.reviewCard__feedbackButton}
          type='button'
          aria-label='feedback button'
        />
      </div>
      <div className={styles.reviewCard__inputSection}>
        <img
          className={styles.reviewCard__userImgSmall}
          alt='Фото пользователя'
        />
        <textarea
          className={styles.reviewCard__textarea}
          value={reviewText}
          onChange={handleReviewChange}
          placeholder='Написать комментарий'
        />
        <button
          className={styles.reviewCard__addButton}
          type='button'
          aria-label='add button'
        />
        <button
          className={styles.reviewCard__sendReviewButton}
          type='button'
          aria-label='send button'
        />
      </div>
    </div>
  );
}

export default ReviewCard;
