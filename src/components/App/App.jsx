import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';

const App = () => {
  const [isLoggedIn /* , setIsLoggedIn */] = useState(false);

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
              />
              <Main />
              {/* <Footer /> */}
            </>
          }
        />
      </Routes>

      {/* <InfoTooltip /> */}
    </>
  );
};

export default App;
