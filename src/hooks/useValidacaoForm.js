import { useContext } from "react";

import ValidacaoFormContext from "../contexts/ValidacaoFormContext";

function useValidacaoForm() {
	return useContext(ValidacaoFormContext);
}

export default useValidacaoForm;
