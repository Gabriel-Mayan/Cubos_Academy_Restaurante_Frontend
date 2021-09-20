import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import "./style.css";
import { post } from '../../requisicoes';
import Ilustracao from "../../assets/illustration.svg";
import useValidacaoForm from "../../hooks/useValidacaoForm";

import Steppers from "../../components/Elements/Steppers";
import Snackbar from "../../components/Elements/Snackbar";
import FormPasso1 from "../../components/Usuario/FormsPassosCadastro/FormPasso1";
import FormPasso2 from "../../components/Usuario/FormsPassosCadastro/FormPasso2";
import FormPasso3 from "../../components/Usuario/FormsPassosCadastro/FormPasso3";

function Cadastro() {
	const history = useHistory();
	const { handleSubmit, register } = useForm();
	const { setMensagem, setAbrirMensagem } = useValidacaoForm();
	const [carregando, setCarregando] = useState(true);

	const passo1 = <FormPasso1 register={register} />;
	const passo2 = <FormPasso2 register={register} />;
	const passo3 = <FormPasso3 register={register} />;

	const formsPassos = [passo1, passo2, passo3];

	const onSubmit = async (data) => {
		setCarregando(true);

		const dadosAPI = {
			nome: data.nome,
			email: data.email,
			senha: data.senha,
			restaurante: {
				nome: data.nomeRestaurante,
				descricao: data.descricao,
				idCategoria: data.categoria,
				taxaEntrega: Number(data.taxaEntrega.replace(",", ".")) * 100,
				tempoEntregaEmMinutos: Number(data.tempoEntrega),
				valorMinimoPedido: Number(data.valorMinPedido.replace(",", ".")) * 100,
			},
		};

		try {
			const dados = await post("usuarios", dadosAPI);
			const mensagemCadastro = await dados.json();
			setCarregando(false);

			if (dados.status === 200) {
				setMensagem({
					texto: mensagemCadastro,
					severidade: "success",
				});
				setAbrirMensagem(true);
				localStorage.clear();
				const timeoutID = setTimeout(() => {
					history.push("/");
					return clearTimeout(timeoutID);
				}, 2000);
				return;
			} else {
				setMensagem({
					texto: mensagemCadastro,
					severidade: "error",
				});
				setAbrirMensagem(true);
				return;
			}
		} catch (error) {
			setCarregando(false);
			setMensagem({
				texto: error.message,
				severidade: "error",
			});
			setAbrirMensagem(true);
			return;
		}
	};

	return (
		<div className="Cadastro">
			<img src={Ilustracao} alt="Ilustração" className="desenhoBg" />
			<div className="formCadastro">
				<form method="post" onSubmit={handleSubmit(onSubmit)}>
					<Steppers
						titulo="Cadastro"
						formsPassos={formsPassos}
						register={register}
						statusCarregamento={carregando}
					/>
				</form>
				<Snackbar />
				<span className="spanRedirLogin">
					Já tem uma conta?{" "}
					<Link to="/" className="linkLogin">
						Login
					</Link>
				</span>
			</div>
		</div>
	);
}

export default Cadastro;
