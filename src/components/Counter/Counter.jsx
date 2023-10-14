import styles from './Counter.module.scss';

function Counter({ product, increaseProductCount, decreaseProductCount }) {
  if (!product) {
    return <div>0</div>;
  }

  function handleIncreaseProduct() {
    increaseProductCount(product.id);
  }

  function handleDecreaseProduct() {
    decreaseProductCount(product.id);
  }

  return (
    <div className={styles.product__count}>
      <button
        className={styles.product__btnCount}
        onClick={handleDecreaseProduct}
      >
        -
      </button>
      <span className={styles.product__countProperity}>{product.count}</span>
      <button
        className={styles.product__btnCount}
        onClick={handleIncreaseProduct}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
