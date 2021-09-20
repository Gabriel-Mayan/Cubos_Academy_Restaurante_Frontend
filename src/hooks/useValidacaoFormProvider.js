import { useState } from "react";

function useValidacaoFormProvider() {
	const [erro, setErro] = useState(false);
	const [mensagem, setMensagem] = useState({});
	const [abrirMensagem, setAbrirMensagem] = useState();

	return {
		erro,
		setErro,
		mensagem,
		setMensagem,
		abrirMensagem,
		setAbrirMensagem,
	};
}

export default useValidacaoFormProvider;
