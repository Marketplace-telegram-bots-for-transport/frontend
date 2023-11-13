import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Seller.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';
import SellerProfile from '../SellerProfile/SellerProfile';
/* import SellerRegister from '../SellerRegister/SellerRegister';
 */ import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import Spoiler from '../Spoiler/Spoiler';
import { useWindowSize } from '../../context/WindowSizeContext';
import { SPOILERS_DATA_FOR_SELLER } from '../../utils/mock';

function Seller({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  // eslint-disable-next-line no-unused-vars
  const isMobile = useWindowSize();
  return (
    <main className={styles.profile}>
      <div className={styles.profile__navigation}>
        <ProfileNavigation onLogout={onLogout} />
      </div>
      <Link className={styles.profile__link} to='/signup-seller' />
      <section className={styles.seller}>
        <div className={styles.seller__container}>
          <h1 className={styles.seller__title}>BotDepot — это</h1>
          <div className={styles.seller__gridContainer}>
            <div className={styles.seller__gridContainer_item}>
              <div className={styles.seller__gridContainer_header}>
                <div className={styles.seller__gridContainer_icon1} />
                <h3 className={styles.seller__gridContainer_title}>
                  Быстрый заработок
                </h3>
              </div>
              <p className={styles.seller__gridContainer_text}>
                По статистике сайта от момента размещения товара до первой
                продажи проходит меньше суток
              </p>
            </div>
            <div className={styles.seller__gridContainer_item}>
              <div className={styles.seller__gridContainer_header}>
                <div className={styles.seller__gridContainer_icon2} />
                <h3 className={styles.seller__gridContainer_title}>
                  Легкий старт
                </h3>
              </div>
              <p className={styles.seller__gridContainer_text}>
                Регистрируйся, создай описание товара, загрузи - и всё! Жди
                успешных продаж!
              </p>
            </div>
            <div className={styles.seller__gridContainer_item}>
              <div className={styles.seller__gridContainer_header}>
                <div className={styles.seller__gridContainer_icon3} />
                <h3 className={styles.seller__gridContainer_title}>
                  Защита сделок
                </h3>
              </div>
              <p className={styles.seller__gridContainer_text}>
                Защита доступа к товарам через WebMoney.Login, ограничения на
                вывод средствю
              </p>
            </div>
            <div className={styles.seller__gridContainer_item}>
              <div className={styles.seller__gridContainer_header}>
                <div className={styles.seller__gridContainer_icon4} />
                <h3 className={styles.seller__gridContainer_title}>
                  Всегда поддержим
                </h3>
              </div>
              <p className={styles.seller__gridContainer_text}>
                Техническая поддержка во внутренней переписке и по email
                работает 24/7
              </p>
            </div>
          </div>

          <div className={styles.seller__faq}>
            <h2 className={styles.seller__title}>Если остались вопросы</h2>
            {SPOILERS_DATA_FOR_SELLER.map((item) => (
              <Spoiler data={item} />
            ))}
            <p className={styles.seller__faq_subtitle}>
              Не нашли ответ на свой вопрос? Напишите нам:{' '}
              <span className={styles.seller__faq_emal}>
                botdepot@yandex.ru
              </span>
            </p>
          </div>
        </div>
        {/*         </section>
      ) : (
        <section className={styles.seller}> */}
        {currentUser.is_author ? <SellerProfile /> : ''}
      </section>
      {/*  )} */}
    </main>
  );
}

export default Seller;
