import styles from './Category.module.scss';

const Category = ({ name }) => {
  return (
    <div className={styles.category}>
      <div className={styles.category__img}>
        <div>img</div>
      </div>
      <p>{name}</p>
    </div>
  );
};

export default Category;
