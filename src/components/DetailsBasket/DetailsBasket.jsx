import React from 'react';
import styles from './DetailsBasket.module.scss';

function DetailsBasket({ botPrice }) {
  return (
    <div className={styles.basketSection}>
      <div className={styles.basketSection__basket}>
        <h2 className={styles.basketSection__title}>Цена:</h2>
        <p className={styles.basketSection__totalPrice}>
          <span>0.00{botPrice}</span>&#8381;
        </p>
        <button className={styles.basketSection__button}>Купить</button>
      </div>
    </div>
  );
}
export default DetailsBasket;
