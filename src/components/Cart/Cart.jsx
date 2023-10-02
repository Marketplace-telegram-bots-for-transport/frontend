import CartProduct from '../CartProduct/CartProduct';
import Payment from '../Payment/Payment';
// import ModalWithAuth from '../ModalWithAuth/ModalWithAuth';
import BackButton from '../BackButton/BackButton';
import styles from './Cart.module.scss';

function Cart({ cartProducts }) {
  const count = cartProducts.length;
  let countText = '';
  if (count === 1) {
    countText = `${count} товар`;
  } else if (count > 1 && count < 5) {
    countText = `${count} товара`;
  } else {
    countText = `${count} товаров`;
  }

  return (
    <section className={styles.cart}>
      <div className={styles.cart__content}>
        <div className={styles.products}>
          <BackButton />
          <ul className={styles.products__list}>
            {cartProducts.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </ul>
          <div className={styles.products__total}>
            <p className={styles.products__count}>Всего: {countText}</p>
            <p className={styles.products__sum}>20000 руб.</p>
          </div>
        </div>
        {/* <ModalWithAuth /> */}
        <Payment />
      </div>
    </section>
  );
}

export default Cart;
