import useStyles from './style.js';
import { useHistory } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';

import barrilLogo from '../../../assets/barril-branco.svg';
import illustrationRestaurantes from '../../../assets/illustration-2.svg';

function Header({ banner, imagem, nome }) {
	const classes = useStyles();
	const { deslogar } = useAuth();
	const history = useHistory();

	const handleLogout = () => {
		deslogar(history.push('/'));
	};

	return (
		<div className={classes.headerProdutos}>
			<img className={classes.imgHeader} src={banner} alt='header' />
			<img className={classes.imgProfile} src={imagem} alt='profile' />
			<div className={classes.headerTexto}>
				<h3>{nome}</h3>
				<div className={classes.containerLogout}>
					<img src={barrilLogo} alt='barril' />
					<button onClick={handleLogout}>Logout</button>
				</div>
			</div>
			<img
				className={classes.illustrationHeader}
				src={illustrationRestaurantes}
				alt='illustration'
			/>
		</div>
	);
}

export default Header;