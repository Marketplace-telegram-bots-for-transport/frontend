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
  const [totalSum, setTotalSum] = useState(0);
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
      return previousValue + product.count * product.price;
    }, 0);
  }, [cartProducts]);

  useEffect(() => {
    const sum = findTotalSum();
    setTotalSum(sum);
  }, [cartProducts, findTotalSum]);

  return (
    <section className={styles.cart}>
      <div className={styles.cart__content}>
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
            <p className={styles.products__count}>Всего: {countText}</p>
            <p className={styles.products__sum}>{totalSum} руб.</p>
          </div>
        </div>
        {isLoggedIn ? <Payment totalSum={totalSum} /> : <ModalWithAuth />}
      </div>
    </section>
  );
}

export default Cart;
