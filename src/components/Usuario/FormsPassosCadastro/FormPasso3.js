import { useEffect, useState } from "react";
import TextField from "../../Elements/Inputs/TextField";
import InputAmount from "../../Elements/Inputs/InputAmount";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

function FormPasso3({ register }) {
	const [taxaEntrega, setTaxaEntrega] = useState();
	const [tempoEntrega, setTempoEntrega] = useState();
	const [valorMinPedido, setValorMinPedido] = useState();
	const { setErro, setMensagem, setAbrirMensagem } = useValidacaoForm();

	useEffect(() => {
		if (!taxaEntrega || !tempoEntrega || !valorMinPedido) {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error",
			});
			setErro(true);
		} else if (
			taxaEntrega === "" ||
			tempoEntrega === "" ||
			valorMinPedido === ""
		) {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error",
			});
			setErro(true);
		} else if (isNaN(Number(taxaEntrega.replace(",", ".")))) {
			setMensagem({
				texto: "O valor do campo Taxa de entrega deve ser um número!",
				severidade: "error",
			});
			setErro(true);
		} else if (isNaN(Number(tempoEntrega))) {
			setMensagem({
				texto: "O valor do campo Tempo estimado de entrega deve ser um número!",
				severidade: "error",
			});
			setErro(true);
		} else if (isNaN(Number(valorMinPedido.replace(",", ".")))) {
			setMensagem({
				texto: "O valor do campo Valor mínimo do pedido deve ser um número!",
				severidade: "error",
			});
			setErro(true);
		} else {
			setMensagem({});
			setAbrirMensagem(false);
			setErro(false);
		}
	}, [taxaEntrega, tempoEntrega, valorMinPedido]);

	return (
		<div className="Passo3">
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
		</div>
	);
}

export default FormPasso3;
