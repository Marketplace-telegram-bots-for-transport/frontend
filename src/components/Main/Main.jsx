import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';
import Categories from '../Categories/Categories';
import * as cats from '../../utils/tempcats.json';

const Main = ({ cartProducts, isProductInCart, addProductToCart }) => {
  const { categories } = cats;

  return (
    <main className={styles.main}>
      <Banner />
      <Categories categories={categories} />
      <BotsList
        cartProducts={cartProducts}
        isProductInCart={isProductInCart}
        addProductToCart={addProductToCart}
      />
    </main>
  );
};

export default Main;
