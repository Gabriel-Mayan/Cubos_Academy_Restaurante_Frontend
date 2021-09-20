import { useEffect, useRef, useState } from "react";

import useValidacaoForm from "../../../hooks/useValidacaoForm";

import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
	root: {
		"& .MuiOutlinedInput-root": {
			height: "47px",
			width: "408px",
			"& fieldset": {
				borderColor: "hsla(0, 0%, 75%, 1)",
			},
			"&:hover fieldset": {
				borderColor: "black",
			},
			"&.Mui-focused fieldset": {
				border: "1px solid hsla(0, 0%, 75%, 1)",
			},
			"&.MuiOutlinedInput-multiline": {
				padding: "10px 24px",
				fontFamily: "'Montserrat', sans-serif",
				height: "74px",
			},
		},
	},
})(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		width: "408px",
		display: "flex",
		flexWrap: "wrap",
		"& input": {
			padding: "10px 24px",
			fontFamily: "'Montserrat', sans-serif",
		},
	},
	margin: {
		marginBottom: "49px",
	},
	helperText: {
		root: {
			fontFamily: "'Montserrat', sans-serif",
		},
	},
}));

export default function TextFieldStyle({
	id,
	type,
	multiline,
	rows,
	inputProps,
	value,
	setValue,
	register,
}) {
	const classes = useStyles();
	const [campoEmBranco, setCampoEmBranco] = useState(false);
	const valueRef = useRef();
	const valueLocalStorageRef = useRef();
	const { abrirMensagem } = useValidacaoForm();

	valueRef.current = value;
	valueLocalStorageRef.current = localStorage.getItem(id);

	useEffect(() => {
		if (valueLocalStorageRef.current) {
			setValue(valueLocalStorageRef.current);
		}

		if ((abrirMensagem && !value) || value === "") {
			setCampoEmBranco(true);
		} else if (value) {
			setCampoEmBranco(false);
		}

	}, [value, abrirMensagem]);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	if (value !== undefined) {
		localStorage.setItem(id, valueRef.current);
	}

	return (
		<div className={classes.root}>
			<CssTextField
				{...register(`${id}`, { value: value })}
				id={id}
				type={type}
				className={classes.margin}
				variant="outlined"
				multiline={multiline}
				rows={multiline ? rows : 1}
				inputProps={inputProps}
				value={value}
				{...register(`${id}`, { value: value })}
				onChange={(e) => handleChange(e)}
				error={multiline ? false : campoEmBranco}
				helperText={multiline ? false : campoEmBranco && "Campo obrigatório"}
				FormHelperTextProps={classes.helperText}
			/>
		</div>
	);
}
