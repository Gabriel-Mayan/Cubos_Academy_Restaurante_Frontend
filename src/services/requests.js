const BASE_URL = process.env.REACT_APP_BASE_URL;

async function get(resource, token) {
	const resposta = await fetch(BASE_URL + resource, {
		method: "GET",
		headers: {
			authorization: token
		}
	});
	const dados = await resposta.json();
	return { dados, erro: !resposta.ok }
}

async function post(resource, data, token) {
	const resposta = await fetch(BASE_URL + resource, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			authorization: token,
			"Content-type": "application/json"
		},
	});

	const dados = await resposta.json();
	return { dados, erro: !resposta.ok }
}

async function put(resource, data, token) {
	const resposta = await fetch(BASE_URL + resource, {
		method: "PUT",
		body: JSON.stringify(data),
		headers: {
			authorization: token,
			"Content-type": "application/json"
		},
	});

	const dados = await resposta.json();
	return { dados, erro: !resposta.ok }
}

async function del(resource, token) {
	const resposta = await fetch(BASE_URL + resource, {
		method: "DELETE",
		headers: {
			authorization: token
		}
	});

	const dados = await resposta.json();
	return { dados, erro: !resposta.ok }
}

export { put, post, get, del };