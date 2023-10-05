import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';

const Main = () => {
  return (
    <main className={styles.main}>
      <Banner />
      <BotsList />
    </main>
  );
};

export default Main;
