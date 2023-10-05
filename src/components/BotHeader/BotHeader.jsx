import React from 'react';
import styles from './BotHeader.module.scss';

// import { Link } from 'react-router-dom';

function BotHeader({ botName }) {
  return (
    <div className={styles.botHeader}>
      <button className={styles.botHeader__button}>1</button>
      {/* <Link className={styles.botHeader__button-return} to="/"></Link> */}
      <div className={styles.botHeader__mainContainer}>
        <h2 className={styles.botHeader__mainTitle}>Главная страница</h2>
        <p className={styles.botHeader__mainSubtitle}>
          Главная страница/ Название бота{botName}
        </p>
      </div>
    </div>
  );
}
export default BotHeader;
