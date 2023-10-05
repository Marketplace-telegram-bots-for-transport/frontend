import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import { products } from '../../utils/products';
import BotDetails from '../BotDetails/BotDetails';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    setCartProducts(products);
  }, []);

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
    <>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header
                counterBots={/* bots.length */ 0}
                isLoggedIn={isLoggedIn}
                isLogOut={handleLogOut}
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
                counterBots={/* bots.length */ 0}
                isLoggedIn={isLoggedIn}
                isLogOut={handleLogOut}
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
          path='/botdetails'
          element={
            <>
              <Header
                counterBots={/* bots.length */ 0}
                isLoggedIn={isLoggedIn}
                isLogOut={handleLogOut}
              />
              <BotDetails />
              <Footer />
            </>
          }
        />
      </Routes>

      {/* <InfoTooltip /> */}
    </>
  );
};

export default App;
