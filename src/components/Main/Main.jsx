import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';
import Categories from '../Categories/Categories';
import cats from '../../utils/tempcats.json';

const Main = ({
  apiBots,
  cartProducts,
  isProductInCart,
  addProductToCart,
  increaseProductCount,
  decreaseProductCount,
}) => {
  const { categories } = cats;

  return (
    <main className={styles.main}>
      <Banner />
      <Categories categories={categories} />
      <BotsList
        apiBots={apiBots}
        cartProducts={cartProducts}
        isProductInCart={isProductInCart}
        addProductToCart={addProductToCart}
        increaseProductCount={increaseProductCount}
        decreaseProductCount={decreaseProductCount}
      />
    </main>
  );
};

export default Main;
