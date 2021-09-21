import React, { useState } from 'react';
import useStyles from './style';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function InputPassword(props) {
	const classes = useStyles();
	const [mostrarSenha, setMostrarSenha] = useState(false);

	const handleClickShowPassword = () => {
		setMostrarSenha(!mostrarSenha);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<FormControl>
			<TextField
				id={props.id}
				variant={props.variant}
				className={classes.className}
				type={mostrarSenha ? 'text' : 'password'}
				{...props.register()}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="trocar visibilidade da senha"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{mostrarSenha ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}
