import { useLocation, useParams } from 'react-router-dom';
import styles from './BackButton.module.scss';

function BackButton({ botName, title, comeBack }) {
  const location = useLocation();
  const { id, botId } = useParams();
  return (
    <div className={styles.returnElement}>
      <button className={styles.returnElement__btn} onClick={comeBack}>
        <p className={styles.returnElement__title}>Назад</p>
      </button>
      <p className={styles.returnElement__ref}>
        Главная страница / {location.pathname === '/cart' ? 'Корзина' : ''}
        {location.pathname === '/signup-seller' ? 'Регистрация продавца' : ''}
        {location.pathname === `/special-offers/${id}` ? title : ''}
        {location.pathname === `/botdetails/${botId}` ? botName : ''}
      </p>
    </div>
  );
}

export default BackButton;
