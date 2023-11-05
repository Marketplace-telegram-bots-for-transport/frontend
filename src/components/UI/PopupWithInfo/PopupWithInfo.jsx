import { useEffect } from 'react';
import styles from './PopupWithInfo.module.scss';

function PopupWithInfo({ isPaid }) {
  const popupClassName = isPaid
    ? `${styles.popup} ${styles.popup_active}`
    : styles.popup;

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={popupClassName}>
      <p className={styles.popup__text}>Покупка прошла успешно!</p>
    </div>
  );
}

export default PopupWithInfo;
