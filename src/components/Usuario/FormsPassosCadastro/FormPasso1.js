import { useEffect, useState } from "react";
import TextField from "../../Elements/Inputs/TextField";
import InputPassword from "../../Elements/Inputs/InputPassword";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

function FormPasso1({ register }) {
	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [rptSenha, setRptSenha] = useState();
	const { setErro, setMensagem, setAbrirMensagem } = useValidacaoForm();

	useEffect(() => {
		if (!nome || !email || !senha || !rptSenha) {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error"
			});
			setErro(true);
		} else if (nome === "" || email === "" || senha === "" || rptSenha === "") {
			setMensagem({
				texto: "Campo obrigatório vazio!",
				severidade: "error"
			});
			setErro(true);
		} else if (senha !== rptSenha) {
			setMensagem({
				texto: "As senhas devem ser iguais!",
				severidade: "error"
			});
			setErro(true);
		} else {
			setMensagem({});
			setAbrirMensagem(false);
			setErro(false);
		}
	}, [nome, email, senha, rptSenha]);

	return (
		<div className="FormPasso1">
			<label htmlFor="nome">Nome de usuário</label>
			<TextField
				id="nome"
				type="text"
				value={nome}
				setValue={setNome}
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
			<label htmlFor="senha">Senha</label>
			<InputPassword id="senha" value={senha} setValue={setSenha} register={register} />
			<label htmlFor="rptSenha">Repita a senha</label>
			<InputPassword id="rptSenha" value={rptSenha} setValue={setRptSenha} register={register} />
		</div>
	);
}

export default FormPasso1;
