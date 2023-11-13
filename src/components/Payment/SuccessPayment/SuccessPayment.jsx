import { useNavigate } from 'react-router-dom';
import accepted from '../../../images/accepted-min.svg';
import styles from './SuccessPayment.module.scss';

function SuccessPayment() {
  const navigate = useNavigate();
  return (
    <div className={styles.payment__successPopap}>
      <div className={styles.payment__success}>
        <div className={styles.payment__successContainer}>
          <div className={styles.payment__successContainer_des}>
            <img
              className={styles.payment__successPicture}
              src={accepted}
              alt='Глалочка'
            />
            <h3 className={styles.payment__successTitle}>
              Оплата прошла успешно!
            </h3>
          </div>
          <button
            className={styles.payment__successButton}
            type='button'
            aria-label='Кнопка На главную страницу'
            onClick={() => navigate('/')}
          >
            На главную страницу
          </button>
        </div>
        <div className={styles.payment__successReg}>
          <h4 className={styles.payment__successReg_title}>
            Хотите получить доступ ко всем функциям платформы?
          </h4>
          <p className={styles.payment__successReg_plusesSubtitle}>
            Преимущества регистрации:
          </p>
          <ul className={styles.payment__successReg_plusesList}>
            <li className={styles.payment__successReg_plusesList_item}>
              История заказов с возможностью повторить их;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Проверка статуса заказа;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Сохранение адресов доставки, контактов получателей, способов
              оплаты и т.д.;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Начисление бонусов за покупки, программа лояльности, личная
              скидка;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Сохранение понравившихся товаров в «Избранное»;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              История просмотров;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Участия в закрытых акциях;
            </li>
            <li className={styles.payment__successReg_plusesList_item}>
              Получение рассылки со специальными и эксклюзивными предложениями,
              информацией о распродажах, акциях, скидках на интересующие их
              товары, и прочее.
            </li>
          </ul>
          <button
            className={styles.payment__successReg_button}
            type='button'
            aria-label='Кнопка На главную страницу'
            onClick={() => navigate('/signup')}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPayment;
