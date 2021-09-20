import useValidacaoFormProvider from '../hooks/useValidacaoFormProvider';
import ValidacaoFormContext from './ValidacaoFormContext';

function ValidacaoFormProvider(props) {
	const validacaoForm = useValidacaoFormProvider();

	return (
		<ValidacaoFormContext.Provider value={validacaoForm}>{props.children}</ValidacaoFormContext.Provider>
	);
};

export default ValidacaoFormProvider;
