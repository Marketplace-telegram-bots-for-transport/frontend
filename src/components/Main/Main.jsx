import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';

const Main = ({ addProductToCart }) => {
  return (
    <main className={styles.main}>
      <Banner />
      <BotsList addProductToCart={addProductToCart} />
    </main>
  );
};

export default Main;
