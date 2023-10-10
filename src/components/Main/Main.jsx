import styles from './Main.module.scss';
import Banner from '../Banner/Banner';
import BotsList from '../BotsList/BotsList';
import CategoriesComponent from '../Categories/Categories';
import Category from '../Category/Category';

const Main = () => {
  return (
    <main className={styles.main}>
      <Banner />
      <CategoriesComponent>
        <div className='carousel-item'>Item 1</div>
        <div className='carousel-item'>Item 2</div>
        <div className='carousel-item'>Item 3</div>
        <div className='carousel-item'>Item 4</div>
        <div className='carousel-item'>Item 5</div>
      </CategoriesComponent>
      <Category />
      <BotsList />
    </main>
  );
};

export default Main;
