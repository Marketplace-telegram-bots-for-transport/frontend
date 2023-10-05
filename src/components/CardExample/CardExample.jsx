import React from 'react';
import styles from './CardExample.module.scss';

function CardExample({ link }) {
  return (
    <div className={styles.cardExample}>
      <img className={styles.cardExample__pic} src={link} alt='Фото' />
    </div>
  );
}
export default CardExample;
