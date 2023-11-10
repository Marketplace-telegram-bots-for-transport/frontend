import React from 'react';
import styles from './Faq.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';

function Faq({ onLogout }) {
  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      <section className={styles.faq} />
    </main>
  );
}

export default Faq;
