import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartProduct from '../CartProduct/CartProduct';
import Payment from '../Payment/Payment';
import ModalWithAuth from '../ModalWithAuth/ModalWithAuth';
import BackButton from '../BackButton/BackButton';
import styles from './Cart.module.scss';
import {
  WIDTH_SCREEN_768,
  NUMBER_UNIT_OF_GOODS,
  NUMBER_UP_TO_FIVE_GOODS,
  TEXT_UNIT_OF_GOODS,
  TEXT_UP_TO_FIVE_GOODS,
  TEXT_MORE_THAN_UP_TO_FIVE_GOODS,
} from '../../utils/constants';

function Cart({
  isLoggedIn,
  cartProducts,
  deleteCartProduct,
  increaseProductCount,
  decreaseProductCount,
  comeBack,
}) {
  const navigate = useNavigate();
  const [totalSum, setTotalSum] = useState(0); // состояние для общей суммы заказа
  const [showFixedButton, setShowFixedButton] = useState(false);
  const [showButton, setShowButton] = useState(
    window.innerWidth <= WIDTH_SCREEN_768
  ); // кнопка купить в мобильной версии
  // функция нахождения общего е=количнства товаров в корзине
  const count = () => {
    const val = cartProducts.reduce((previousValue, product) => {
      return previousValue + product.count;
    }, 0);
    return val;
  };

  let countText = '';
  if (count() === NUMBER_UNIT_OF_GOODS) {
    countText = `${count()} ${TEXT_UNIT_OF_GOODS}`;
  } else if (
    count() > NUMBER_UNIT_OF_GOODS &&
    count() < NUMBER_UP_TO_FIVE_GOODS
  ) {
    countText = `${count()} ${TEXT_UP_TO_FIVE_GOODS}`;
  } else {
    countText = `${count()} ${TEXT_MORE_THAN_UP_TO_FIVE_GOODS}`;
  }

  // функция расчета общей суммы заказа
  const findTotalSum = useCallback(() => {
    return cartProducts.reduce((previousValue, product) => {
      return previousValue + product.price * product.count;
    }, 0);
  }, [cartProducts]);

  useEffect(() => {
    const sum = findTotalSum();
    setTotalSum(sum);
  }, [cartProducts, findTotalSum]);

  // прокрутка скролла наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // отображение кнопки при размере экрана меньше 768px
  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= WIDTH_SCREEN_768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBuyButtonClick = () => {
    navigate('/pay-form');
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Проверяем, если прокрутка достигла конца страницы
      if (windowHeight + scrollTop >= docHeight) {
        setShowFixedButton(true);
      } else {
        setShowFixedButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Удаление обработчика события при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={styles.cart}>
      <div className={styles.products}>
        <BackButton comeBack={comeBack} />
        <ul className={styles.products__list}>
          {cartProducts.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              deleteCartProduct={deleteCartProduct}
              increaseProductCount={increaseProductCount}
              decreaseProductCount={decreaseProductCount}
            />
          ))}
          {showButton && showFixedButton && !isLoggedIn && (
            <div className={styles.products__containerFixedButtonMobile}>
              <button className={styles.products__fixedButtonMobile}>
                <Link
                  className={styles.products__fixedButtonMobile_link}
                  to='/login'
                >
                  Войдите
                </Link>
              </button>
              <p className={styles.products__fixedButtonMobile_count}>
                {countText}
              </p>
              <p className={styles.products__fixedButtonMobile_count}>
                {totalSum}₽
              </p>
            </div>
          )}
          {showButton && isLoggedIn && (
            <div className={styles.products__containerFixedButtonMobile}>
              <button
                className={styles.products__fixedButtonMobile}
                onClick={handleBuyButtonClick}
                aria-label='Открыть форму оплаты'
              >
                Купить
                <p className={styles.products__fixedButtonMobile_count}>
                  {totalSum}₽
                </p>
              </button>
            </div>
          )}
        </ul>
        <div className={styles.products__total}>
          <h3 className={styles.products__totalTitle}>Итог</h3>
          <div className={styles.products__totalContainer}>
            <p className={styles.products__count}>Всего: {countText}</p>
            <p className={styles.products__sum}>{totalSum}₽</p>
          </div>
          {showButton && isLoggedIn && (
            <button
              className={styles.products__buttonMobile}
              onClick={handleBuyButtonClick}
              aria-label='Открыть форму оплаты'
            >
              Купить
            </button>
          )}

          {showButton && showFixedButton && !isLoggedIn && (
            <>
              <p className={styles.products__textMobile}>
                Войдите, чтобы продолжить покупки
              </p>
              <button className={styles.products__buttonMobile}>
                <Link
                  className={styles.products__buttonMobile_link}
                  to='/login'
                >
                  Войти
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
      {isLoggedIn && !showButton && <Payment totalSum={totalSum} />}
      {!isLoggedIn && !showButton && <ModalWithAuth />}
    </section>
  );
}

export default Cart;
