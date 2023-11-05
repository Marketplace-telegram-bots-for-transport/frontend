import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { WIDTH_SCREEN_768 } from '../../utils/constants';

function BackButton({ botName, title, comeBack }) {
  const location = useLocation();
  const { id, botId } = useParams();

  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  ); // кнопка купить в мобильной версии

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.returnElement}>
      {showButton ? (
        <button className={styles.returnElement__btn} onClick={comeBack}>
          <p className={styles.returnElement__title}>
            {location.pathname === '/cart' ? 'Корзина' : ''}
            {location.pathname === '/pay-form' ? 'Оплата картой' : ''}
            {location.pathname === `/special-offers/${id}` ? title : ''}
            {location.pathname === `/botdetails/${botId}` ? botName : ''}
          </p>
        </button>
      ) : (
        <button className={styles.returnElement__btn} onClick={comeBack}>
          <p className={styles.returnElement__title}>Назад</p>
        </button>
      )}
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
