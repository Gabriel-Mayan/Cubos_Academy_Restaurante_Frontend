import useStyles from './style.js';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function LinkEntrarCadastrar(props) {
	const classes = useStyles();

	return (
		<div className={classes.linkContainer}>
			<Typography variant='caption' color='textSecondary'>
				{props.texto}
			</Typography>
			<Link className={classes.link} to={`${props.destino}`}>
				{props.titulo}
			</Link>
		</div>
	);
}

export default LinkEntrarCadastrar;

