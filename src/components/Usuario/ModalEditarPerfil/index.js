import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import useAuth from "../../../hooks/useAuth";
import emptyImage from "../../../assets/emptyImage.svg";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

import UploadImage from "../../UploadImage";
import Select from "../../Elements/Inputs/Select";
import TextField from "../../Elements/Inputs/TextField";
import InputAmount from "../../Elements/Inputs/InputAmount";
import InputPassword from "../../Elements/Inputs/InputPassword";
import { put, get } from "../../../requisicoes";

import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "1000px",
		backgroundColor: "hsla(0, 0%, 100%, 1)",
		padding: "64px",
		borderRadius: "16px",
		boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.4)",
		display: "flex",
		flexDirection: "column",
		top: "875px",
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
	text: {
		color: "hsla(14, 99%, 41%, 1)",
		"&:hover": {
			color: "hsla(14, 84%, 36%, 1)",
			boxShadow: "none",
			background: "none",
		},
		"&:disabled": {
			color: "hsla(218, 8%, 80%, 1)",
		},
	},
	buttonsStepper: {
		margin: "auto 0 0 auto",
		display: "flex",
		flexDirection: "row",
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
	titulo: {
		fontFamily: "'Baloo 2', cursive",
		color: "hsla(14, 99%, 41%, 1)",
		fontSize: "32px",
		marginBottom: "40px",
	},
}));

export default function SimpleModal({ open, setOpen }) {
	const classes = useStyles();
	const [nomeUsuario, setNomeUsuario] = useState();
	const [email, setEmail] = useState();
	const [nomeRestaurante, setNomeRestaurante] = useState();
	const [categoria, setCategoria] = useState("");
	const [descricao, setDescricao] = useState();
	const [taxaEntrega, setTaxaEntrega] = useState();
	const [tempoEntrega, setTempoEntrega] = useState();
	const [valorMinPedido, setValorMinPedido] = useState();
	const [senha, setSenha] = useState();
	const [rptSenha, setRptSenha] = useState();
	const [baseImage, setBaseImage] = useState("");
	const { register, handleSubmit } = useForm();
	const { token } = useAuth();
	const { setMensagem, setAbrirMensagem } = useValidacaoForm();
	const [opcoes, setOpcoes] = useState([]);

	const buscarCategorias = async () => {
		try {
			const resposta = await get("categoria");
			const categorias = await resposta.json();

			setOpcoes(categorias);
		} catch (error) {
			console.log(error.message);
		}
	};

	const buscarInfosUsuario = async () => {
		try {
			const resposta = await get("usuarios", token);
			const infoUsuario = await resposta.json();

			setNomeUsuario(infoUsuario.nomeUsuario);
			setEmail(infoUsuario.email);
			setNomeRestaurante(infoUsuario.nomeRestaurante);
			setCategoria(infoUsuario.categoriaRestaurante);
			setDescricao(infoUsuario.descricaoRestaurante);
			setTaxaEntrega(
				String((infoUsuario.taxaEntrega / 100).toFixed(2)).replace(".", ",")
			);
			setTempoEntrega(infoUsuario.tempoEntregaEmMinutos);
			setValorMinPedido(
				String((infoUsuario.valorMinimoPedido / 100).toFixed(2)).replace(
					".",
					","
				)
			);
			setBaseImage(infoUsuario.imagemRestaurante);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		buscarCategorias();
		buscarInfosUsuario();
		localStorage.clear();
	}, [open]);

	const onSubmit = async (data) => {
		let dadosAPI = {};

		if (data.nomeUsuario === "" || !data.nomeUsuario) return;
		if (data.email === "" || !data.email) return;
		if (data.nomeRestaurante === "" || !data.nomeRestaurante) return;
		if (data.categoria === "" || !data.categoria) return;
		if (data.taxaEntrega === "" || !data.taxaEntrega) return;
		if (data.tempoEntrega === "" || !data.tempoEntrega) return;
		if (data.valorMinPedido === "" || !data.valorMinPedido) return;

		if (
			data.senha === "" ||
			!data.senha ||
			data.rptSenha === "" ||
			!data.rptSenha
		) {
			dadosAPI = {
				nome: data.nomeUsuario,
				email: data.email,
				restaurante: {
					nome: data.nomeRestaurante,
					descricao: data.descricao,
					idCategoria: data.categoria,
					taxaEntrega: Number(data.taxaEntrega.replace(",", ".")) * 100,
					tempoEntregaEmMinutos: Number(data.tempoEntrega),
					valorMinimoPedido:
						Number(data.valorMinPedido.replace(",", ".")) * 100,
				},
			};
		} else {
			if (data.senha !== data.rptSenha) {
				setMensagem({
					texto: "As senhas devem ser iguais!",
					severidade: "error",
				});
				setAbrirMensagem(true);
				return;
			}

			dadosAPI = {
				nome: data.nomeUsuario,
				email: data.email,
				senha: data.senha,
				restaurante: {
					nome: data.nomeRestaurante,
					descricao: data.descricao,
					idCategoria: data.categoria,
					taxaEntrega: Number(data.taxaEntrega.replace(",", ".")) * 100,
					tempoEntregaEmMinutos: Number(data.tempoEntrega),
					valorMinimoPedido:
						Number(data.valorMinPedido.replace(",", ".")) * 100,
				},
			};
		}

		if (data.uploadImagem.includes("base64")) {
			dadosAPI.restaurante = { ...dadosAPI.restaurante, imagemRestaurante: data.uploadImagem }
		}

		try {
			const dados = await put("usuarios", dadosAPI, token);

			const mensagem = await dados.json();

			if (dados.status === 200) {
				setMensagem({
					texto: mensagem,
					severidade: "success",
				});
				setAbrirMensagem(true);
				handleClose();
				return;
			} else {
				setMensagem({
					texto: mensagem,
					severidade: "error",
				});
				setAbrirMensagem(true);
				return;
			}
		} catch (error) {
			setMensagem({
				texto: error.message,
				severidade: "error",
			});
			setAbrirMensagem(true);
			return;
		}
	};

	const body = (
		<form
			style={classes.modalStyle}
			className={classes.paper}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className={classes.editarPerfil}>
				<div className={classes.formulario}>
					<h1 className={classes.titulo}>Editar Perfil</h1>
					<label htmlFor="nomeUsuario">Nome de usuário</label>
					<TextField
						id="nomeUsuario"
						type="text"
						value={nomeUsuario}
						setValue={setNomeUsuario}
						register={register}
					/>
					<label htmlFor="email">Email</label>
					<TextField
						id="email"
						type="email"
						value={email}
						setValue={setEmail}
						register={register}
					/>
					<label htmlFor="nomeRestaurante">Nome do restaurante</label>
					<TextField
						id="nomeRestaurante"
						type="text"
						value={nomeRestaurante}
						setValue={setNomeRestaurante}
						register={register}
					/>
					<label htmlFor="categoria">Categoria do restaurante</label>
					<Select
						id="categoria"
						opcoes={opcoes}
						value={categoria}
						setValue={setCategoria}
						register={register}
					/>
					<label htmlFor="descricao">Descrição</label>
					<TextField
						type="text"
						id="descricao"
						multiline={true}
						rows={2}
						inputProps={{ maxLength: "50" }}
						value={descricao}
						setValue={setDescricao}
						register={register}
					/>
					<span className="avisoQtdCaracteres">Máx.: 50 caracteres</span>
					<label htmlFor="taxaEntrega">Taxa de entrega</label>
					<InputAmount
						id="taxaEntrega"
						value={taxaEntrega}
						setValue={setTaxaEntrega}
						register={register}
						width="408px"
					/>
					<label htmlFor="tempoEntrega">Tempo estimado de entrega</label>
					<TextField
						id="tempoEntrega"
						type="text"
						value={tempoEntrega}
						setValue={setTempoEntrega}
						register={register}
					/>
					<label htmlFor="valorMinPedido">Valor mínimo do pedido</label>
					<InputAmount
						id="valorMinPedido"
						value={valorMinPedido}
						setValue={setValorMinPedido}
						register={register}
						width="408px"
					/>
					<label htmlFor="senha">Senha</label>
					<InputPassword
						id="senha"
						value={senha}
						setValue={setSenha}
						register={register}
					/>
					<label htmlFor="rptSenha">Repita a senha</label>
					<InputPassword
						id="rptSenha"
						value={rptSenha}
						setValue={setRptSenha}
						register={register}
					/>
				</div>
				<UploadImage
					baseImage={baseImage}
					setBaseImage={setBaseImage}
					register={register}
					id="uploadImagem"
				/>
			</div>
			<div className={classes.buttonsStepper}>
				<Button
					onClick={handleClose}
					className={clsx(classes.button, classes.text)}
				>
					Cancelar
				</Button>
				<Button
					type="submit"
					variant="contained"
					className={clsx(classes.button, classes.contained)}
				>
					Salvar alterações
				</Button>
			</div>
		</form>
	);

	return (
		<div style={{ overflow: "scroll" }}>
			<img
				src={!baseImage ? emptyImage : baseImage}
				alt=""
				className="profileImage"
				onClick={handleOpen}
			/>
			<Modal open={open} onClose={handleClose} className={classes.modal}>
				{body}
			</Modal>
		</div>
	);
}
