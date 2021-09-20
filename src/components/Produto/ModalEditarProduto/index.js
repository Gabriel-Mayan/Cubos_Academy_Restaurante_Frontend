import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Switch from "../../Elements/Switch";
import { put } from "../../../requisicoes";
import UploadImage from "../../UploadImage";
import useAuth from "../../../hooks/useAuth";
import TextField from "../../Elements/Inputs/TextField";
import InputAmount from "../../Elements/Inputs/InputAmount";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";

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
		top: "500px",
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
	editarProduto: {
		display: "flex",
		flexDirection: "row",
		gap: "48px"
	},
	titulo: {
		fontFamily: "'Baloo 2', cursive",
		color: "hsla(14, 99%, 41%, 1)",
		fontSize: "32px",
		marginBottom: "40px",
	},
}));

export default function SimpleModal({
	open,
	setOpen,
	id,
	nome,
	descricao,
	preco,
	ativo,
	permiteObservacoes,
	urlImagem
}) {
	const classes = useStyles();

	const [valor, setValor] = useState();
	const [baseImage, setBaseImage] = useState("");
	const [nomeProduto, setNomeProduto] = useState();
	const [ativarProduto, setAtivarProduto] = useState(true);
	const [descricaoProduto, setDescricaoProduto] = useState();
	const [permiteObservacao, setPermiteObservacao] = useState(true);

	const { token } = useAuth();
	const { register, handleSubmit, unregister } = useForm();
	const { setMensagem, setAbrirMensagem } = useValidacaoForm();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		unregister("nomeProduto");
		unregister("descricaoProduto");
		unregister("valor");
		unregister("ativarProduto");
		unregister("permiteObservacao");
		setNomeProduto();
		localStorage.removeItem("nomeProduto");
		setDescricaoProduto();
		localStorage.removeItem("descricaoProduto");
		setValor();
		localStorage.removeItem("valor");
		setAbrirMensagem(false);
	};

	useEffect(() => {
		setNomeProduto(nome);
		setDescricaoProduto(descricao);
		setValor(String((preco / 100).toFixed(2)).replace(".", ","));
		setAtivarProduto(Boolean(ativo));
		setPermiteObservacao(Boolean(permiteObservacoes));
		setBaseImage(urlImagem);
		register("nomeProduto");
		register("descricaoProduto");
		register("valor");
		register("ativarProduto");
		register("permiteObservacao");
	}, [open]);

	const onSubmit = async (data) => {
		if (data.nomeProduto === "" || !data.nomeProduto) return;
		if (data.valor === "" || !data.valor) return;

		let dadosAPI = {
			nome: data.nomeProduto,
			descricao: data.descricaoProduto,
			preco: Math.round(Number(data.valor.replace(",", ".")) * 100),
			ativo: Boolean(data.ativarProduto),
			permiteObservacoes: Boolean(data.permiteObservacao),
		};

		if (data.uploadImagem.includes("base64")) {
			dadosAPI = { ...dadosAPI, imagemProduto: data.uploadImagem };
		}

		try {
			const dados = await put(`produtos/${id}`, dadosAPI, token);

			const mensagem = await dados.json();

			if (dados.status === 200) {
				setMensagem({
					texto: mensagem,
					severidade: "success",
				});
				setAbrirMensagem(true);
				const timeoutID = setTimeout(() => {
					handleClose();
					return clearTimeout(timeoutID);
				}, 1000);
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
		<form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.editarProduto}>
				<div className={classes.formulario}>
					<h1 className={classes.titulo}>Editar produto</h1>
					<label htmlFor="nome">Nome</label>
					<TextField
						id="nomeProduto"
						type="text"
						value={nomeProduto}
						setValue={setNomeProduto}
						register={register}
					/>
					<label htmlFor="email">Descrição</label>
					<TextField
						type="text"
						id="descricaoProduto"
						multiline={true}
						rows={2}
						inputProps={{ maxLength: "50" }}
						value={descricaoProduto}
						setValue={setDescricaoProduto}
						register={register}
					/>
					<span className="avisoQtdCaracteres">Máx.: 50 caracteres</span>
					<label htmlFor="valor">Valor</label>
					<InputAmount
						id="valor"
						value={valor}
						setValue={setValor}
						register={register}
						width="176px"
					/>
					<Switch
						id="ativarProduto"
						label="Ativar produto"
						register={register}
						value={ativarProduto}
						setValue={setAtivarProduto}
						unregister={unregister}
					/>
					<Switch
						id="permiteObservacao"
						label="Permite observações"
						register={register}
						value={permiteObservacao}
						setValue={setPermiteObservacao}
						unregister={unregister}
					/>
				</div>
				<UploadImage baseImage={baseImage} setBaseImage={setBaseImage} register={register} id="uploadImagem" />
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
		<div>
			<Button
				type="button"
				variant="contained"
				onClick={handleOpen}
				className={clsx(classes.button, classes.contained)}
				endIcon={<BorderColorIcon />}
			>
				Editar produto
			</Button>
			<Modal open={open} onClose={handleClose} className={classes.modal}>
				{body}
			</Modal>
		</div>
	);
}
