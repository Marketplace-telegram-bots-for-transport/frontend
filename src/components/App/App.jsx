import { useState, createContext /* временное значение */ } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// eslint-disable-next-line import/no-cycle
import PasswordReset from '../PasswordReset/PasswordReset';

export const currentUserContext = createContext(); /* временное значение */

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [email, setEmail] = useState(''); // состояние электронной почты для фиксации вводимый почты
  const [otp, setOTP] = useState(''); // состояние одноразового пароля

  /* Функция для выхода из профиля, 
  должна будет стирать данные токена */
  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <currentUserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      /* временное значение */ value={{ otp, setOTP, email, setEmail }}
    >
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
          path='/reset-password'
          element={
            <>
              <Header counterBots={/* bots.length */ 0} />
              <PasswordReset />
              <Footer />
            </>
          }
        />
      </Routes>
    </currentUserContext.Provider>
  );
};

export default App;
