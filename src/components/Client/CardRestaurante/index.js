import useStyles from './style';
import { useHistory } from 'react-router-dom';

function CardRestaurante({ titulo, descricao, preco, imagem, id }) {
	const classes = useStyles();
	const history = useHistory();
	let tagPreco = '';

	if (preco <= 2000) {
		tagPreco = '$';
	} else if (preco <= 4000) {
		tagPreco = '$$';
	} else if (preco <= 7000) {
		tagPreco = '$$$';
	} else {
		tagPreco = '$$$$';
	}

	const cardapioRestaurante = () => {
		history.push(`/cliente/cardapio/${id}`);
	};

	return (
		<div onClick={cardapioRestaurante} className={classes.cardContainer}>
			<div className={classes.cardTexto}>
				<h4>{titulo}</h4>
				<p>{descricao}</p>
				<div className={classes.containerPreco}>{tagPreco}</div>
			</div>
			<img src={`${imagem}?${Date.now()}`} alt={titulo} />
		</div>
	);
}

export default CardRestaurante;