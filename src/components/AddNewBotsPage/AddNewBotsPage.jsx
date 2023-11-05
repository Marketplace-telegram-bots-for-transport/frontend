import AddNewBotsSection from '../AddNewBotSection/AddNewBotSection';
import BackButton from '../BackButton/BackButton';
import styles from './AddNewBotsPage.module.scss';

function AddBotsPage({ comeBack }) {
  return (
    <section className={styles.additionPage}>
      <BackButton comeBack={comeBack} />
      <div className={styles.additionPage__container}>
        <AddNewBotsSection />
      </div>
    </section>
  );
}

export default AddBotsPage;
