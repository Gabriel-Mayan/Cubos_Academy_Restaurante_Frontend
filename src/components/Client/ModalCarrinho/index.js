import clsx from "clsx";

import PlusIcon from "../../../assets/plus.svg";
import bgHeader from "../../../assets/pizza.png";
import MinusIcon from "../../../assets/minus.svg";
import imgProfile from "../../../assets/pizzaria.png";
import iconPedidoMin from "../../../assets/pedido-minimo-icon.svg";
import iconTempoEntrega from "../../../assets/tempo-entrega-icon.svg";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "625px",
		height: "820px",
		backgroundColor: "hsla(0, 0%, 100%, 1)",
		borderRadius: "16px",
		boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.4)",
		display: "flex",
		flexDirection: "column",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	modal: {
		overflow: "scroll",
	},
	contained: {
		marginRight: theme.spacing(1),
		borderRadius: "20px",
		boxShadow: "none",
		height: "40px",
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: "600",
		fontSize: "14px",
		color: "hsla(0, 0%, 100%, 1)",
		backgroundColor: "hsla(14, 99%, 41%, 1)",
		paddingLeft: "40px",
		paddingRight: "40px",
		"&:hover": {
			backgroundColor: "hsla(14, 84%, 36%, 1)",
			boxShadow: "none",
		},
		"&:disabled": {
			backgroundColor: "hsla(218, 8%, 80%, 1)",
			color: "hsla(210, 3%, 45%, 1)",
		},
	},
	button: {
		marginRight: theme.spacing(1),
		borderRadius: "20px",
		textTransform: "none",
		boxShadow: "none",
		height: "40px",
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: "600",
		fontSize: "14px",
	},
	formulario: {
		display: "flex",
		flexDirection: "column",
	},
	editarPerfil: {
		display: "flex",
		flexDirection: "row",
		gap: "48px",
	},
	nomeProduto: {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "36px",
		fontWeight: 600,
		color: "hsla(223, 4%, 34%, 1)",
		marginBottom: "23px",
	},
	imgProfile: {
		border: "6px solid #ffffff",
		borderRadius: "50%",
		width: "119px",
		height: "119px",
		position: "absolute",
		top: "274px",
		left: "429px",
	},
	header: {
		backgroundSize: "cover",
		backgroundRepeat: "nao-repeat",
		height: "337px",
		width: "625px",
		borderTopLeftRadius: "16px",
		borderTopRightRadius: "16px",
	},
	conteudo: {
		margin: "58px",
		display: "flex",
		flexDirection: "column",
	},
	infosRestaurante: {
		display: "flex",
		gap: "32px",
		marginBottom: "44px",
	},
	info: {
		display: "flex",
		alignItems: "center",
		gap: "9px",
	},
	propInfo: {
		fontFamily: "'Montserrat', sans-serif",
		fontSize: "14px",
		fontWeight: 600,
		color: "hsla(223, 4%, 34%, 1)",
	},
	valorInfo: {
		fontWeight: 400,
	},
	descricaoEPreco: {
		display: "flex",
		gap: "28px",
		alignItems: "center"
	},
	descricao: {
		width: "270px",
	},
	preco: {
		background:
			"linear-gradient(0deg, rgba(13, 138, 79, 0.1), rgba(13, 138, 79, 0.1)), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
		color: "hsla(152, 100%, 19%, 1)",
		fontWeight: 600,
		fontFamily: '"Montserrat", sans-serif',
		fontSize: "24px",
		padding: "12px 39px",
		width: "max-content",
		borderRadius: "4px",
	},
	botaoQtd: {
		all: "unset",
		height: "40px",
		width: "40px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "hsla(14, 99%, 41%, 1)",
	},
	menos: {
		borderTopLeftRadius: "5px",
		borderBottomLeftRadius: "5px",
	},
	mais: {
		borderTopRightRadius: "5px",
		borderBottomRightRadius: "5px",
	}
}));

export default function SimpleModal({ open, setOpen }) {
	const classes = useStyles();

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div className={classes.paper}>
			<div
				className={classes.header}
				style={{ backgroundImage: `url(${bgHeader})` }}
			>
				<img src={imgProfile} alt="" className={classes.imgProfile} />
			</div>
			<div className={classes.conteudo}>
				<h1 className={classes.nomeProduto}>Pizza Portuguesa</h1>
				<div className={classes.infosRestaurante}>
					<div className={classes.info}>
						<img src={iconPedidoMin} alt="" />
						<span className={classes.propInfo}>
							Pedido Mínimo: <span className={classes.valorInfo}>R$ 30,00</span>
						</span>
					</div>
					<div className={classes.info}>
						<img src={iconTempoEntrega} alt="" />
						<span className={classes.propInfo}>
							Tempo de Entrega:{" "}
							<span className={classes.valorInfo}>60min - 90min</span>
						</span>
					</div>
				</div>
				<div className={classes.descricaoEPreco}>
					<p className={classes.descricao}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam,
						facilis id harum fugit nobis distinctio totam!
					</p>
					<div className={classes.preco}>R$ 99,99</div>
				</div>
				<div className={classes.botoes}>
					<button className={clsx(classes.botaoQtd, classes.menos)}><img src={MinusIcon} alt="" /></button>
					<button className={clsx(classes.botaoQtd, classes.mais)}><img src={PlusIcon} alt="" /></button>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<Modal open={true} onClose={handleClose} className={classes.modal}>
				{body}
			</Modal>
		</div>
	);
}
