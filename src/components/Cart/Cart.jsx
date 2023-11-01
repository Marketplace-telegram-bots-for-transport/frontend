import { useCallback, useEffect, useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import Payment from '../Payment/Payment';
import ModalWithAuth from '../ModalWithAuth/ModalWithAuth';
import BackButton from '../BackButton/BackButton';
import styles from './Cart.module.scss';
import {
  NUMBER_UNIT_OF_GOODS,
  NUMBER_UP_TO_FIVE_GOODS,
  TEXT_UNIT_OF_GOODS,
  TEXT_UP_TO_FIVE_GOODS,
  TEXT_MORE_THAN_UP_TO_FIVE_GOODS,
} from '../../utils/constants';

function Cart({
  isLoggedIn,
  cartProducts,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
  comeBack,
}) {
  const [totalSum, setTotalSum] = useState(0.0); // состояние для общей суммы заказа

  // функция нахождения общего е=количнства товаров в корзине
  const count = () => {
    const val = cartProducts.reduce((previousValue, product) => {
      return previousValue + product.count;
    }, 0);
    return val;
  };

  let countText = '';
  if (count() === NUMBER_UNIT_OF_GOODS) {
    countText = `${count()} ${TEXT_UNIT_OF_GOODS}`;
  } else if (
    count() > NUMBER_UNIT_OF_GOODS &&
    count() < NUMBER_UP_TO_FIVE_GOODS
  ) {
    countText = `${count()} ${TEXT_UP_TO_FIVE_GOODS}`;
  } else {
    countText = `${count()} ${TEXT_MORE_THAN_UP_TO_FIVE_GOODS}`;
  }

  // функция расчета общей суммы заказа
  const findTotalSum = useCallback(() => {
    return cartProducts.reduce((previousValue, product) => {
      return (
        previousValue + parseFloat(product.price).toFixed(2) * product.count
      );
    }, 0.0);
  }, [cartProducts]);

  useEffect(() => {
    const sum = findTotalSum();
    setTotalSum(sum.toFixed(2));
  }, [cartProducts, findTotalSum]);

  return (
    <section className={styles.cart}>
      <div className={styles.products}>
        <BackButton comeBack={comeBack} />
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
            <p className={styles.products__sum}>{totalSum}₽</p>
          </div>
        </div>
      </div>
      {isLoggedIn ? <Payment totalSum={totalSum} /> : <ModalWithAuth />}
    </section>
  );
}

export default Cart;
