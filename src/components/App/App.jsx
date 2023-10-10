import { useState, useEffect, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';

import CurrentUserContext from '../../context/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import { products } from '../../utils/products';
import BotDetails from '../BotDetails/BotDetails';

import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import OTPPassword from '../ResetPassword/OTPPassword/OTPPassword';
import ChangePassword from '../ResetPassword/ChangePassword/ChangePassword';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(products);
  }, []);

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

  // Функция увеличения количества товара
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

  // Функция уменьшения количества товара
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

  return (
    <CurrentUserContext.Provider value={contextValue}>
      <div className={styles.page}>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isLogOut={handleLogOut}
                  cartProducts={cartProducts}
                />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path='/cart'
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isLogOut={handleLogOut}
                  cartProducts={cartProducts}
                />
                <Cart
                  isLoggedIn={isLoggedIn}
                  cartProducts={cartProducts}
                  deleteCartProduct={deleteCartProduct}
                  increaseProductCount={increaseProductCount}
                  decreaseProductCount={decreaseProductCount}
                />
                <Footer />
              </>
            }
          />
          <Route
            path='/botdetails/:botId'
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isLogOut={handleLogOut}
                  cartProducts={cartProducts}
                />
                <BotDetails />
                <Footer />
              </>
            }
          />

          <Route
            path='/login'
            element={
              <>
                <Header cartProducts={cartProducts} />
                <Login />
                <Footer />
              </>
            }
          />

          <Route
            path='/signup'
            element={
              <>
                <Header cartProducts={cartProducts} />
                <Register />
                <Footer />
              </>
            }
          />

          <Route
            path='/reset-password'
            element={
              <>
                <Header cartProducts={cartProducts} />
                <ResetPassword />
                <Footer />
              </>
            }
          />

          <Route
            path='/OTP-password'
            element={
              <>
                <Header cartProducts={cartProducts} />
                <OTPPassword />
                <Footer />
              </>
            }
          />

          <Route
            path='/change-password'
            element={
              <>
                <Header cartProducts={cartProducts} />
                <ChangePassword />
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
