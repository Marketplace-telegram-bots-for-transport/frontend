import React from 'react';
import styles from './Seller.module.scss';
import CurrentUserContext from '../../context/CurrentUserContext';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import SellerProfile from '../SellerProfile/SellerProfile';
import SellerRegister from '../SellerRegister/SellerRegister';

function Seller({ onLogout }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.seller}>
        {currentUser.is_author ? <SellerProfile /> : <SellerRegister />}
      </section>
    </main>
  );
}

export default Seller;
