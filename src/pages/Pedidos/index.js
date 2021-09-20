import clsx from "clsx";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./style.css";
import { get } from '../../requisicoes';

import useAuth from "../../hooks/useAuth";
import useValidacaoForm from "../../hooks/useValidacaoForm";

import Snackbars from "../../components/Elements/Snackbar";
import CardPedido from "../../components/Pedido/CardPedido";

import profileImage from "../../assets/pizzaria.png";
import Ilustracao from "../../assets/illustration-2.svg";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
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
}));

function Pedidos() {
	const classes = useStyles();
	const history = useHistory();

	const { deslogar, token } = useAuth();
	const { setAbrirMensagem } = useValidacaoForm();
	const [qtdProdutos, setQtdProdutos] = useState(0);
	const [recarregar, setRecarregar] = useState(false);
	const [infoRestaurante, setInfoRestaurante] = useState({});
	const [produtosCadastrados, setProdutosCadastrados] = useState();
	const [abrirModalNovoProd, setAbrirModalNovoProd] = useState(false);
	const [abrirModalEditProd, setAbrirModalEditProd] = useState(false);

	const redirLogin = () => {
		history.push("/");
	};

	const redirCardapio = () => {
		history.push("/produtos");
	};

	const listagemPedido = async () => {
		try {
			const resposta = await get("pedidos", token);
			const dados = await resposta.json();
			if (JSON.stringify(dados) === JSON.stringify(produtosCadastrados)) return;
			setProdutosCadastrados(dados);
			setQtdProdutos(dados.length);
		} catch (error) {
			console.log(error.message);
		}
	};

	const infosRestaurante = async () => {
		try {
			const resposta = await get("usuarios", token);
			const dados = await resposta.json();

			const { nomeRestaurante, categoriaRestaurante } = dados;
			try {
				const resposta = await get(`categoria/${categoriaRestaurante}`);
				const categoria = await resposta.json();

				const infoCategoria = categoria[0];

				setInfoRestaurante({
					nome: nomeRestaurante,
					imgCategoria: infoCategoria.img_categoria,
				});
			} catch (error) {
				console.log(error.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		listagemPedido();
		infosRestaurante();
		setRecarregar(false);
		setAbrirMensagem(false);
	}, [abrirModalNovoProd, abrirModalEditProd, recarregar]);

	return (
		<div className="Dashboard">
			<div
				className="banner"
				style={{
					backgroundImage: `linear-gradient(205.02deg, rgba(18, 18, 18, 0.2) 36.52%, rgba(18, 18, 18, 0.8) 77.14%), url('${infoRestaurante.imgCategoria}')`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<img src={profileImage} alt="" className="profileImage" />
				<div className="cabecalho">
					<h1>{infoRestaurante.nome}</h1>
					<button className="logout" onClick={() => deslogar(redirLogin)}>
						Logout
					</button>
				</div>
				<img src={Ilustracao} alt="" className="desenhoBanner" />
			</div>
			{qtdProdutos === 0 ? (
				<div className="dashboardSemProdutos">
					<p>
						Você ainda não tem nenhum pedido pendente
					</p>
					<Snackbars />
				</div>
			) : (
				<div className="produtos">
					<div></div>
					<Button
						type="button"
						variant="contained"
						onClick={redirCardapio}
						className={clsx(classes.button, classes.contained)}
					>
						Cardápio do Restaurante
					</Button>
					{produtosCadastrados.map((produto) => (
						<CardPedido
							idPedido={produto.idPedido}
							nome={produto.nome}
							totalPedido={produto.totalPedido}
							cep={produto.cep}
							endereco={produto.endereco}
							carrinho={produto.carrinho}
							open={abrirModalEditProd}
							setOpen={setAbrirModalEditProd}
							key={produto.id}
							setRecarregar={setRecarregar}
						/>
					))}
				</div>
			)}
		</div>
	);
}

export default Pedidos;
