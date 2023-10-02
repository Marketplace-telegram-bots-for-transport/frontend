import styles from './CartProduct.module.scss';

function CartProduct({ product }) {
  return (
    <li className={styles.product}>
      <div className={styles.product__item}>
        <div className={styles.product__img} />
        <p className={styles.product__title}>{product.name}</p>
      </div>
      <div className={styles.product__item}>
        <p className={styles.product__price}>{product.price} ₽</p>
        <div className={styles.product__count}>
          <button className={styles.product__btnCount}>-</button>
          <span className={styles.product__countProperity}>4</span>
          <button className={styles.product__btnCount}>+</button>
        </div>
        <button
          className={styles.product__btnDelete}
          aria-label='delete button'
        />
      </div>
    </li>
  );
}

export default CartProduct;
