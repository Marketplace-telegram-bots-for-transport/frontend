import styles from './Category.module.scss';

const Category = ({ name }) => {
  return (
    <div className={styles.category}>
      <div className={styles.category__img}>
        <div>img</div>
      </div>
      <p className={styles.category__name}>{name}</p>
    </div>
  );
};

export default Category;
