import { createContext } from "react";
import useValidacaoFormProvider from "../hooks/useValidacaoFormProvider";

const ValidacaoFormContext = createContext();

export function ValidacaoFormProvider(props) {
	const validacaoForm = useValidacaoFormProvider();

	return (
		<ValidacaoFormContext.Provider value={validacaoForm}>
			{props.children}
		</ValidacaoFormContext.Provider>
	);
}

export default ValidacaoFormContext;
