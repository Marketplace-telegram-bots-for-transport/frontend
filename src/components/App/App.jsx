import { useState, useMemo, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import BotDetails from '../BotDetails/BotDetails';

import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import OTPPassword from '../ResetPassword/OTPPassword/OTPPassword';
import ChangePassword from '../ResetPassword/ChangePassword/ChangePassword';
import { fetchInitialBots } from '../../utils/api/getBots';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartProducts, setCartProducts] = useState([]); // состояние товаров в корзине
  const [email, setEmail] = useState(''); // состояние электронной почты для фиксации вводимый почты
  const [OTP, setOTP] = useState(''); // состояние одноразового пароля

  // get api bots
  const [apiBots, setApiBots] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const botData = await fetchInitialBots();
      setApiBots(botData);
    }

    fetchData();
  }, []);

  /* временные значения */
  const contextValue = useMemo(() => {
    return { OTP, setOTP, email, setEmail };
  }, [OTP, setOTP, email, setEmail]);

  /* Функция для выхода из профиля, 
  должна будет стирать данные токена */
  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  // Функция удаления товара из коризны
  const deleteCartProduct = (id) => {
    setCartProducts(() => {
      return cartProducts.filter((product) => {
        return id !== product.id;
      });
    });
  };

  // Функция увеличения количества товаров
  const increaseProductCount = (id) => {
    setCartProducts(() => {
      return cartProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
    });
  };

  // Функция уменьшения количества товаров
  const decreaseProductCount = (id) => {
    setCartProducts(() => {
      return cartProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            count: product.count - 1 >= 1 ? product.count - 1 : product.count,
          };
        }
        return product;
      });
    });
  };

  // Функция добавления товара в корзину
  const addProductToCart = (newBot) => {
    const updatedBot = { ...newBot, count: 1 };
    setCartProducts([...cartProducts, updatedBot]);
  };

  // Функция определяющая наличие данного бота в коризне
  const isProductInCart = (id) => {
    const productInCart = cartProducts.some((product) => product.id === id);
    return productInCart;
  };

  // Функция, которая возвращает на предыдущую страницу
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <div className={styles.page}>
        <Header
          isLoggedIn={isLoggedIn}
          isLogOut={handleLogOut}
          cartProducts={cartProducts}
          deleteCartProduct={deleteCartProduct}
        />

        <Routes>
          <Route
            path='/'
            element={
              apiBots !== null ? (
                <Main
                  apiBots={apiBots}
                  cartProducts={cartProducts}
                  isProductInCart={isProductInCart}
                  addProductToCart={addProductToCart}
                  increaseProductCount={increaseProductCount}
                  decreaseProductCount={decreaseProductCount}
                />
              ) : (
                'пусто'
              )
            }
          />

          <Route
            path='/cart'
            element={
              <Cart
                isLoggedIn={isLoggedIn}
                cartProducts={cartProducts}
                deleteCartProduct={deleteCartProduct}
                increaseProductCount={increaseProductCount}
                decreaseProductCount={decreaseProductCount}
                comeBack={handleGoBack}
              />
            }
          />

          <Route
            path='/botdetails/:botId'
            element={
              <BotDetails
                apiBots={apiBots}
                cartProducts={cartProducts}
                isProductInCart={isProductInCart}
                addProductToCart={addProductToCart}
                increaseProductCount={increaseProductCount}
                decreaseProductCount={decreaseProductCount}
                comeBack={handleGoBack}
              />
            }
          />

          <Route path='/login' element={<Login />} />

          <Route
            path='/signup'
            element={<Register comeBack={handleGoBack} />}
          />

          <Route
            path='/reset-password'
            element={<ResetPassword comeBack={handleGoBack} />}
          />

          <Route
            path='/OTP-password'
            element={<OTPPassword comeBack={handleGoBack} />}
          />

          <Route
            path='/change-password'
            element={<ChangePassword comeBack={handleGoBack} />}
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
