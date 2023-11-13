import React from 'react';
import styles from './Faq.module.scss';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import Spoiler from '../Spoiler/Spoiler';
import { SPOILERS_DATA } from '../../utils/mock';
import { useWindowSize } from '../../context/WindowSizeContext';

function Faq({ onLogout }) {
  const isMobile = useWindowSize();

  return (
    <main className={styles.profile}>
      <ProfileNavigation onLogout={onLogout} />
      {isMobile ? (
        <>
          <h2 className={styles.faq__title}>Часто задаваемые вопросы</h2>
          <section className={styles.faq}>
            <p className={styles.faq__subtitle}>
              Здесь вы найдете ответы на часто задаваемые вопросы. Они помогут
              вам получить полезную информацию о маркетплейсе по торговле
              телеграм-ботами в сфере транспорта. Если у вас возникнут еще
              вопросы, не стесняйтесь обратиться к службе поддержки платформы
              или связаться напрямую с продавцом или покупателем.
            </p>
            {SPOILERS_DATA.map((item) => (
              <Spoiler data={item} />
            ))}
            <div className={styles.faq__help}>
              <p className={styles.faq__help_subtitle}>
                Не нашли ответ на свой вопрос? Напишите нам: <br />
                <a
                  className={styles.faq__help_link}
                  href='mailto:botdepot@yandex.ru'
                >
                  botdepot@yandex.ru
                </a>
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.faq}>
          <h2 className={styles.faq__title}>Часто задаваемые вопросы (FAQ)</h2>
          {SPOILERS_DATA.map((item) => (
            <Spoiler data={item} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Faq;
