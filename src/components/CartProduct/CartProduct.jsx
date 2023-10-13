import { Link } from 'react-router-dom';
import styles from './CartProduct.module.scss';
import Counter from '../Counter/Counter';

function CartProduct({
  product,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
}) {
  function handleDeleteCartProduct() {
    deleteCartProduct(product.id);
  }

  return (
    <li className={styles.product}>
      <Link className={styles.product__item} to={`/botdetails/${product.id}`}>
        <div className={styles.product__img} />
        <p className={styles.product__title}>{product.name}</p>
      </Link>
      <div className={styles.product__item}>
        <p className={styles.product__price}>
          {parseFloat(product.price * product.count).toFixed(2)} ₽
        </p>
        <Counter
          product={product}
          increaseProductCount={increaseProductCount}
          decreaseProductCount={decreaseProductCount}
        />
        <button
          className={styles.product__btnDelete}
          aria-label='delete button'
          onClick={handleDeleteCartProduct}
        />
      </div>
    </li>
  );
}

export default CartProduct;
