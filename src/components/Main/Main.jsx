import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';
// import * as cats from '../../utils/tempcats.json';

const Main = ({ cartProducts, isProductInCart, addProductToCart }) => {
  // const { categories } = cats;

  return (
    <main className={styles.main}>
      <Banner />
      <BotsList
        cartProducts={cartProducts}
        isProductInCart={isProductInCart}
        addProductToCart={addProductToCart}
      />
    </main>
  );
};

export default Main;
