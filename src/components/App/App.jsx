import { useState, useMemo } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CurrentUserContext from '../../context/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import ResetPassword from '../ResetPassword/ResetPassword';
import OTPPassword from '../ResetPassword/OTPPassword/OTPPassword';
import ChangePassword from '../ResetPassword/ChangePassword/ChangePassword';

const App = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

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

  return (
    <CurrentUserContext.Provider value={contextValue}>
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
              <ResetPassword />
              <Footer />
            </>
          }
        />

        <Route
          path='/OTP-password'
          element={
            <>
              <Header counterBots={/* bots.length */ 0} />
              <OTPPassword />
              <Footer />
            </>
          }
        />

        <Route
          path='/change-password'
          element={
            <>
              <Header counterBots={/* bots.length */ 0} />
              <ChangePassword />
              <Footer />
            </>
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
