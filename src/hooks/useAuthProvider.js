import { useState } from 'react';


export default function useAuthProvider() {
	const [token, setToken] = useState(localStorage.getItem('token') ?? null);

	const logar = (tokenUsuario, callback) => {
		setToken(tokenUsuario);
		localStorage.setItem('token', tokenUsuario);
		if (callback) callback();
	};

	const deslogar = (callback) => {
		setToken(null);
		localStorage.removeItem('token');
		if (callback) callback();
	};

	return {
		logar,
		deslogar,
		token,
	};
}