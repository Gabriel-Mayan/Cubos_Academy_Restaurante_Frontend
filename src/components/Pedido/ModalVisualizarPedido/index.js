import clsx from "clsx";
import { useState, useEffect } from "react";

import makeStyles from './style'
import { get } from '../../../requisicoes';
import useAuth from "../../../hooks/useAuth";

import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";


const useStyles = makeStyles;

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

export default function ModalVisualizarPedido({ id, open, setOpen }) {
	const classes = useStyles();
	const { token } = useAuth();

	const [modalStyle] = useState(getModalStyle());

	const [cepProduto, setCepProduto] = useState();
	const [nomeProduto, setNomeProduto] = useState();
	const [totalProduto, setTotalProduto] = useState();
	const [carrinhoProduto, setCarrinhoProduto] = useState();
	const [enderecoProduto, setEnderecoProduto] = useState();
	const [complementoProduto, setComplementoProduto] = useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const infosPedido = async () => {
		try {
			const resposta = await get(`pedidos/${id.toString()}`, token);
			const dados = await resposta.json();

			const { nome, cep, endereco, complemento, carrinho, totalPedido } = dados;
			setNomeProduto(nome);
			setCepProduto(cep);
			setEnderecoProduto(endereco);
			setComplementoProduto(complemento);
			setCarrinhoProduto(carrinho);
			setTotalProduto(totalPedido);
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		infosPedido();
	});

	const body = (
		<form
			style={modalStyle}
			className={classes.paper}
		>

			<div className="FormNovoProduto">
				<h1>Detalhes do Pedido:</h1>
				<label htmlFor="nome">Nome do Cliente: {nomeProduto} </label>
				<label htmlFor="nome">CEP: {cepProduto} </label>
				<label htmlFor="nome">Endereço do Cliente: {enderecoProduto} </label>
				<label htmlFor="nome">Complemento Endereço: {complementoProduto} </label>
				<label htmlFor="nome">Total da Venda: {totalProduto} </label>
				<label htmlFor="nome">Itens no Carrinho: { } </label>
			</div>

			<div className={classes.buttonsStepper}>
				<Button
					onClick={handleClose}
					className={clsx(classes.button, classes.text)}
				>
					Fechar
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
			>
				Vizualizar Detalhes do Pedido
			</Button>
			<Modal open={open} onClose={handleClose}>
				{body}
			</Modal>
		</div>
	);
}
