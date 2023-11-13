import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SellerRegister.module.scss';

function SellerRegister() {
  const navigate = useNavigate();

  return (
    <section className={styles.seller}>
      <button
        className={styles.seller__button}
        onClick={() => {
          navigate('/signup-seller', { replace: true });
        }}
      >
        Стать продавцом
      </button>
    </section>
  );
}

export default SellerRegister;
