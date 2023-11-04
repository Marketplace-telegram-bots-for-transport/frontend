import { useState, useMemo, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import BotDetails from '../BotDetails/BotDetails';

import SpecialOffers from '../SpecialOffers/SpecialOffers';

import Login from '../Login/Login';
import Register from '../Register/Register';
import ResetPassword from '../ResetPassword/ResetPassword';
import OTPPassword from '../ResetPassword/OTPPassword/OTPPassword';
import ChangePassword from '../ResetPassword/ChangePassword/ChangePassword';
import { fetchInitialBots, fetchSearchBots } from '../../utils/api/getBots';
import * as authorizeApi from '../../utils/api/authorizeApi';
import * as userApi from '../../utils/api/userApi';
import RegisterSeller from '../RegisterSeller/RegisterSeller';
// import AddNewBotsPage from '../AddNewBotsPage/AddNewBotsPage';
import { CART_KEY } from '../../utils/constants';
import {
  updateCartWithLocalStorage,
  checkAndRemoveExpiredData,
} from '../../hooks/useCartInLocalStorage';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartProducts, setCartProducts] = useState([]); // состояние товаров в корзине
  const [email, setEmail] = useState(''); // состояние электронной почты для фиксации вводимый почты
  const [OTP, setOTP] = useState(''); // состояние одноразового пароля
  const [currentUser, setCurrentUser] = useState(null);
  const [apiBots, setApiBots] = useState(null); // get api bots

  const contextValue = useMemo(() => {
    return { OTP, setOTP, email, setEmail, currentUser };
  }, [OTP, setOTP, email, setEmail, currentUser]);

  useEffect(() => {
    async function fetchData() {
      const botData = await fetchInitialBots();
      setApiBots(botData);
    }

    fetchData();
  }, []);

  // // Проверка токена
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      authorizeApi
        .checkToken(jwt)
        .then((res) => {
          console.log('успешная проверка токена');
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          navigate('/login', { replace: true });
          console.log(err);
        });
    }
  }, [isLoggedIn, navigate]);

  // получение данных пользователя
  useEffect(() => {
    async function fetchUserData() {
      if (isLoggedIn) {
        const jwt = localStorage.getItem('jwt');
        const userData = await userApi.getUserInfo(jwt);
        setCurrentUser(userData);
      }
    }

    fetchUserData();
  }, [isLoggedIn]);

  // Функция поиска для хэдера
  const handleSearch = async (query) => {
    const botsData = await fetchSearchBots(query);

    setApiBots(botsData);
  };

  // Функция для выхода из профиля
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setCurrentUser('');
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
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

  // Проверка localStorage и восстановление корзины
  useEffect(() => {
    checkAndRemoveExpiredData(isLoggedIn);
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, [isLoggedIn]);

  // Функция добавления товара в корзину
  const addProductToCart = (newBot) => {
    const updatedBot = { ...newBot, count: 1 };
    const updatedCart = [...cartProducts, updatedBot];
    updateCartWithLocalStorage(updatedCart, setCartProducts);
  };

  // Функция удаления товара из корзины
  const deleteCartProduct = (id) => {
    const updatedCart = cartProducts.filter((product) => id !== product.id);
    updateCartWithLocalStorage(updatedCart, setCartProducts);
  };

  // Функция определяющая наличие данного бота в коризне
  const isProductInCart = (id) => {
    const productInCart = cartProducts.some((product) => product.id === id);
    return productInCart;
  };

  // Функция, которая возвращает на предыдущую страницу
  const handleGoBack = () => {
    navigate(-1);
  };

  //  Функция авторизации
  const handleLogin = (values) => {
    authorizeApi
      .authorize(values.password, values.username)
      .then((res) => {
        if (res.auth_token) {
          console.log('успешный вход');
          localStorage.setItem('jwt', res.auth_token);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  Функция регистрации пользователя
  const handleRegister = (values) => {
    authorizeApi
      .register(
        values.email,
        values.username,
        values.password,
        values.confirm_password
      )
      .then(() => {
        console.log('регистрация успешна');
        handleLogin(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.page}>
      <CurrentUserContext.Provider value={contextValue}>
        <Header
          isLoggedIn={isLoggedIn}
          isLogOut={handleLogOut}
          cartProducts={cartProducts}
          deleteCartProduct={deleteCartProduct}
          onSearch={handleSearch}
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
              ) : null
            }
          />

          <Route
            path='/special-offers/:id'
            element={
              apiBots !== null ? (
                <SpecialOffers
                  apiBots={apiBots}
                  addProductToCart={addProductToCart}
                />
              ) : (
                'Ничего не найдено'
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

          <Route
            path='/login'
            element={<Login loggedIn={isLoggedIn} onLogin={handleLogin} />}
          />

          <Route
            path='/signup'
            element={
              <Register
                comeBack={handleGoBack}
                loggedIn={isLoggedIn}
                onRegister={handleRegister}
              />
            }
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

          <Route
            path='/signup-seller'
            element={<RegisterSeller comeBack={handleGoBack} />}
          />
          {/* <Route
            path='/add-new-bots'
            element={<AddNewBotsPage comeBack={handleGoBack} />}
          /> */}
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
