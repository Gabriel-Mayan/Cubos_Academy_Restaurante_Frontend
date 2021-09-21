import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';

import useStyles from './style';
import useAuth from '../../hooks/useAuth';
import { post } from '../../services/requests';
import IllustrationLogin from '../../assets/illustration-3.svg';
import InputPassword from '../../components/Elements/Inputs/InputPassword/index';

import { Alert } from '@material-ui/lab';
import { TextField, Typography, CircularProgress } from '@material-ui/core';

function Login() {
	const [loading, setLoading] = useState(false);
	const [erro, setErro] = useState('');

	const classes = useStyles();
	const history = useHistory();

	const { logar } = useAuth();
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		setLoading(true);
		setErro('');

		if (!data.email || !data.senha) {
			setErro('Email e senha são obrigatórios.');
			setLoading(false);
			return;
		}

		try {
			const { dados, erro } = await post('login', data);

			if (erro) {
				setErro(dados);
				setLoading(false);
				return;
			}
			logar(dados.token, () => history.push('/produtos'));
		} catch (error) {
			setErro(error.message);
			setLoading(false);
		}
		setLoading(false);
	};

	return (
		<div className={classes.containerLogin}>
			<img className={classes.illustrationLogin} src={IllustrationLogin} alt="" />

			<div className={classes.root}>
				<h2 className={classes.loginTitle}>Login</h2>
				<form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
					<div className={classes.containerInput}>
						<label htmlFor='email'>Email</label>
						<TextField id='email' variant='outlined' className={classes.input} {...register('email')} />
					</div>

					<div className={classes.containerInput}>
						<label htmlFor='senha'>Senha</label>
						<InputPassword id='senha' variant='outlined' className={classes.input} register={() => register('senha')} />
						{erro && <Alert severity="error">{erro}</Alert>}
					</div>

					<button type='submit' className={classes.botao}>
						Entrar
					</button>

					<div className={classes.linkContainer}>
						<Typography variant='caption' color='textSecondary'>
							Ainda não tem uma conta? <Link className={classes.link} to='/cadastro'> Cadastre-se </Link>
						</Typography>
					</div>
				</form>
			</div>

			<div className={loading ? classes.backdrop : classes.noBackdrop}>
				<CircularProgress />
			</div>
		</div>
	);
}

export default Login;