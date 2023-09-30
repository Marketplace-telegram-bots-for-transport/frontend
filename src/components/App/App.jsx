import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  /* Функция для выхода из профиля, 
  должна будет стирать данные токена */
  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate('/');
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
      </Routes>

      {/* <InfoTooltip /> */}
    </>
  );
};

export default App;
