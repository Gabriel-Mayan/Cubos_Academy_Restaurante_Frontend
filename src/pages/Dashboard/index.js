import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./style.css";
import { get } from '../../requisicoes';
import Ilustracao from "../../assets/illustration-2.svg";

import useAuth from "../../hooks/useAuth";
import useValidacaoForm from "../../hooks/useValidacaoForm";

import Snackbars from "../../components/Elements/Snackbar";
import CardProduto from "../../components/Produto/CardProduto";
import ModalNovoProduto from "../../components/Produto/ModalNovoProduto";
import ModalEditarPerfil from "../../components/Usuario/ModalEditarPerfil";

function Dashboard() {
	const history = useHistory();
	const { deslogar, token } = useAuth();
	const { setAbrirMensagem } = useValidacaoForm();

	const [qtdProdutos, setQtdProdutos] = useState(0);
	const [recarregar, setRecarregar] = useState(false);
	const [infoRestaurante, setInfoRestaurante] = useState({});
	const [produtosCadastrados, setProdutosCadastrados] = useState();
	const [abrirModalNovoProd, setAbrirModalNovoProd] = useState(false);
	const [abrirModalEditProd, setAbrirModalEditProd] = useState(false);
	const [abrirModalEditPerfil, setAbrirModalEditPerfil] = useState(false);

	const redirLogin = () => {
		history.push("/");
	};

	const buscarProdutos = async () => {
		try {
			const resposta = await get("produtos", token);
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
				console.log(infoCategoria.img_categoria);
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
		infosRestaurante();
		buscarProdutos();
		setRecarregar(false);
		setAbrirMensagem(false);
	}, [abrirModalNovoProd, abrirModalEditProd, abrirModalEditPerfil, recarregar]);

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
				<ModalEditarPerfil open={abrirModalEditPerfil} setOpen={setAbrirModalEditPerfil} />
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
						Você ainda não tem nenhum produto no seu cardápio. <br />
						Gostaria de adicionar um novo produto?
					</p>
					<ModalNovoProduto
						open={abrirModalNovoProd}
						setOpen={setAbrirModalNovoProd}
					/>
					<Snackbars />
				</div>
			) : (
				<div className="produtos">
					<div></div>
					<ModalNovoProduto
						open={abrirModalNovoProd}
						setOpen={setAbrirModalNovoProd}
					/>
					{produtosCadastrados.map((produto) => (
						<CardProduto
							nome={produto.nome}
							descricao={produto.descricao}
							preco={produto.preco}
							id={produto.id}
							ativo={produto.ativo}
							permiteObservacoes={produto.permite_observacoes}
							urlImagem={produto.img_produto}
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

export default Dashboard;
