import { get } from "../../../requisicoes";
import { useEffect, useState } from "react";
import Select from "../../Elements/Inputs/Select";
import TextField from "../../Elements/Inputs/TextField";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

function FormPasso2({ register }) {
	const [opcoes, setOpcoes] = useState([]);
	const [descricao, setDescricao] = useState();
	const [categoria, setCategoria] = useState("");
	const [nomeRestaurante, setNomeRestaurante] = useState();

	const { setErro, setMensagem, setAbrirMensagem } = useValidacaoForm();

	const buscarCategorias = async () => {
		try {
			const resposta = await get("categoria");
			const categorias = await resposta.json();

			setOpcoes(categorias);
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		buscarCategorias();
		if (!nomeRestaurante || !categoria) {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error"
			});
			setErro(true);
		} else if (
			nomeRestaurante === "" ||
			categoria === "" ||
			categoria === "0"
		) {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error"
			});
			setErro(true);
		} else {
			setMensagem({});
			setAbrirMensagem(false);
			setErro(false);
		}
	}, [nomeRestaurante, categoria]);

	return (
		<div className="FormPasso2">
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
		</div>
	);
}

export default FormPasso2;
