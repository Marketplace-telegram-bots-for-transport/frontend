import React from 'react';
import styles from './SellerOn.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import SellerProfile from '../SellerProfile/SellerProfile';

function SellerOn({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.seller}>
        <SellerProfile />
      </section>
    </main>
  );
}

export default SellerOn;
