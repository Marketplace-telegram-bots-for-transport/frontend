import SpecialOffers from '../SpecialOffers/SpecialOffers';
import logo from '../../images/temp_logo.svg';
import styles from './Main.module.scss';

const Main = () => {
	return (
		<main className={styles.main}>
			<div className={styles.main__titleContainer}>
				<img className={styles.main__titleLogo} src={logo} alt='logo' />
				<h2 className={styles.main__titleText}>Название магазина</h2>
			</div>
			<SpecialOffers />
		</main>
	);
};

export default Main;
