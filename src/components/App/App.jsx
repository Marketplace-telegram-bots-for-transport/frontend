import { useState, useMemo } from 'react';
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

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartProducts, setCartProducts] = useState([]); // состояние товаров в корзине
  const [email, setEmail] = useState(''); // состояние электронной почты для фиксации вводимый почты
  const [OTP, setOTP] = useState(''); // состояние одноразового пароля

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
    setCartProducts([...cartProducts, newBot]);
  };

  // Функция определяющая наличие данного бота в коризне
  const isProductInCart = (id) => {
    const val = cartProducts.some((product) => product.id === id);
    console.log(val);
    return val;
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
              <Main
                cartProducts={cartProducts}
                isProductInCart={isProductInCart}
                addProductToCart={addProductToCart}
                increaseProductCount={increaseProductCount}
                decreaseProductCount={decreaseProductCount}
              />
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
              />
            }
          />

          <Route path='/botdetails/:botId' element={<BotDetails />} />

          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<Register />} />

          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='/OTP-password' element={<OTPPassword />} />

          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
