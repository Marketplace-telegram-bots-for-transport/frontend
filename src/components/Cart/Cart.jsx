import { useCallback, useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import Payment from '../Payment/Payment';
import ModalWithAuth from '../ModalWithAuth/ModalWithAuth';
import BackButton from '../BackButton/BackButton';
import styles from './Cart.module.scss';

function Cart({
  isLoggedIn,
  cartProducts,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
}) {
  const [totalSum, setTotalSum] = useState(0.0);
  const count = cartProducts.length;
  let countText = '';
  if (count === 1) {
    countText = `${count} товар`;
  } else if (count > 1 && count < 5) {
    countText = `${count} товара`;
  } else {
    countText = `${count} товаров`;
  }

  const findTotalSum = useCallback(() => {
    return cartProducts.reduce((previousValue, product) => {
      return (
        previousValue + parseFloat(product.price).toFixed(2) * product.count
      );
    }, 0.0);
  }, [cartProducts]);

  useEffect(() => {
    const sum = findTotalSum();
    setTotalSum(sum);
  }, [cartProducts, findTotalSum]);

  return (
    <section className={styles.cart}>
      <div className={styles.products}>
        <BackButton />
        <ul className={styles.products__list}>
          {cartProducts.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              deleteCartProduct={deleteCartProduct}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          ))}
        </ul>
        <div className={styles.products__total}>
          <h3 className={styles.products__totalTitle}>Итог</h3>
          <div className={styles.products__totalContainer}>
            <p className={styles.products__count}>Всего: {countText}</p>
            <p className={styles.products__sum}>{totalSum.toFixed(2)}₽</p>
          </div>
        </div>
      </div>
      {isLoggedIn ? <Payment totalSum={totalSum} /> : <ModalWithAuth />}
    </section>
  );
}

export default Cart;
