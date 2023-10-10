import styles from './CartProduct.module.scss';

function CartProduct({
  product,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
}) {
  function handleDeleteCartProduct() {
    deleteCartProduct(product.id);
  }

  function handleIncreaseProduct() {
    increaseProductCount(product.id);
  }

  function handleDecreaseProduct() {
    decreaseProductCount(product.id);
  }

  return (
    <li className={styles.product}>
      <div className={styles.product__item}>
        <div className={styles.product__img} />
        <p className={styles.product__title}>{product.name}</p>
      </div>
      <div className={styles.product__item}>
        <p className={styles.product__price}>
          {parseFloat(product.price * product.count).toFixed(2)} ₽
        </p>
        <div className={styles.product__count}>
          <button
            className={styles.product__btnCount}
            onClick={handleDecreaseProduct}
          >
            -
          </button>
          <span className={styles.product__countProperity}>
            {product.count}
          </span>
          <button
            className={styles.product__btnCount}
            onClick={handleIncreaseProduct}
          >
            +
          </button>
        </div>
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
