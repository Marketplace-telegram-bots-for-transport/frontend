import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';
// import * as cats from '../../utils/tempcats.json';

const Main = () => {
  // const { categories } = cats;

  return (
    <main className={styles.main}>
      <Banner />
      <BotsList />
    </main>
  );
};

export default Main;
