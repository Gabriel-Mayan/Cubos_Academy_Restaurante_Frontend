import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import useStyles from './style';
import { post } from '../../requisicoes';
import useAuth from '../../hooks/useAuth';
import IllustrationLogin from '../../assets/illustration-3.svg';
import LinkEntrarCadastrar from '../../components/Usuario/LinkEntrarCadastrar';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

function Login() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const classes = useStyles();
	const history = useHistory();

	const { logar } = useAuth();
	const { register, handleSubmit } = useForm();

	const toastError = {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	const onSubmit = async (data) => {
		if (!data.email || !data.senha) {
			toast.error('Email e senha são obrigatórios.', toastError);
			return;
		}
		setLoading(true);
		try {
			const response = await post("login", data);

			if (!response.ok) {
				setLoading(false);
				toast.error('Email ou senha incorretos.', toastError);
				return;
			}
			const dados = await response.json();
			logar(dados.token, () => history.push('/produtos'));
		} catch (error) {
			setLoading(false);
		}
		setLoading(false);
	};

	const handleClickShowPassword = () => {
		setShowPassword((prevValue) => !prevValue);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className={classes.containerLogin}>
			<div className={loading ? classes.backdrop : classes.noBackdrop}>
				<CircularProgress />
			</div>
			<img className={classes.illustrationLogin} src={IllustrationLogin} alt="" />
			<div className={classes.root}>
				<h2 className={classes.loginTitle}>Login</h2>
				<form
					className={classes.form}
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={classes.containerInput}>
						<label htmlFor='email'>Email</label>
						<TextField
							className={classes.input}
							id='email'
							variant='outlined'
							{...register('email')}
						/>
					</div>
					<div className={classes.containerInput}>
						<label htmlFor='senha'>Senha</label>
						<FormControl variant='outlined' className={classes.input}>
							<OutlinedInput
								className={classes.input}
								id='senha'
								type={showPassword ? 'text' : 'password'}
								{...register('senha')}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</div>
					<button type='submit' className={classes.botao}>
						Entrar
					</button>
				</form>
				<LinkEntrarCadastrar
					texto='Ainda não tem uma conta?'
					destino='/cadastro'
					titulo='Cadastre-se'
				/>
			</div>
		</div>
	);
}

export default Login;