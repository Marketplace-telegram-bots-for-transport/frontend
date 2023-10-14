import styles from './Category.module.scss';

const Category = ({ name, imageUrl }) => {
  const imgStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className={styles.category}>
      <div className={styles.category__img} style={imgStyle} />
      <p className={styles.category__name}>{name}</p>
    </div>
  );
};

export default Category;
