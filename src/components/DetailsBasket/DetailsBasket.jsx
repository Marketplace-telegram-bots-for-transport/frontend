import React from 'react';
import styles from './DetailsBasket.module.scss';

function DetailsBasket({ botPrice }) {
  return (
    <div className={styles.basketSection}>
      <div className={styles.basketSection__basket}>
        <h2 className={styles.basketSection__title}>Цена:</h2>
        <p className={styles.basketSection__totalPrice}>
          <span>{botPrice}</span>&#8381;
        </p>
        <button className={styles.basketSection__button}>В корзину</button>
      </div>
    </div>
  );
}
export default DetailsBasket;
