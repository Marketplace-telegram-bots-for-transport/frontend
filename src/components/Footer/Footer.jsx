import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import logo from '../../images/logo-min.svg';
import phone from '../../images/phone-min.svg';
import email from '../../images/email-min.svg';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__container_address}>
          <Link className={styles.footer__link} to='/'>
            <img
              className={styles.footer__logo}
              src={logo}
              alt='Логотип сайта'
            />
          </Link>
          <address className={styles.footer__contacts}>
            <div className={styles.footer__contacts_phone}>
              <img
                className={styles.footer__contacts_phone_image}
                src={phone}
                alt='Телефон'
              />
              <a
                className={styles.footer__contacts_phone_link}
                href='tel:+79999999999'
              >
                +7-999-999-99-99
              </a>
            </div>
            <div className={styles.footer__contacts_email}>
              <img
                className={styles.footer__contacts_email_image}
                src={email}
                alt='Конверт'
              />
              <a
                className={styles.footer__contacts_email_link}
                href='mailto:mail@example.com'
              >
                example@yandex.ru
              </a>
            </div>
          </address>
        </div>

        <nav className={styles.footer__link}>
          <Link className={styles.footer__link_navigate} href='/'>
            Главная
          </Link>
          <Link className={styles.footer__link_navigate} href='/'>
            О нас
          </Link>
          <Link className={styles.footer__link_navigate} href='/'>
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
