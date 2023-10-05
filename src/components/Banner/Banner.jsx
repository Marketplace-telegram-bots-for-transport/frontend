import styles from './Banner.module.scss';
import bannerImage from '../../images/banner-background.png'; // Import the image

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img
        src={bannerImage}
        alt='Banner Background'
        className={styles.banner__image}
      />

      <div className={styles.banner__titlebox}>
        <h1 className={styles.banner__title}>Bot Depot</h1>
        <h2 className={styles.banner__subtitle}>
          Первый маркетплейс с телеграм-ботами в сфере транспорта
        </h2>
      </div>
    </div>
  );
};

export default Banner;
