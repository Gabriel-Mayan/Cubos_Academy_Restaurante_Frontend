import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import useValidacaoForm from "../../../hooks/useValidacaoForm";

import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "hsla(0, 0%, 75%, 1)",
			},
			"&:hover fieldset": {
				borderColor: "black",
			},
			"&.Mui-focused fieldset": {
				border: "1px solid hsla(0, 0%, 75%, 1)",
			},
			"&.MuiOutlinedInput-adornedStart": {
				paddingLeft: "24px",
				height: "47px",
			},
		},
	},
	margin: {
		marginBottom: "49px",
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		"& input": {
			padding: "10px 24px 10px 0",
			fontFamily: "'Montserrat', sans-serif",
		},
	},
	fontFamily: {
		fontFamily: "'Montserrat', sans-serif",
	},
	helperText: {
		margin: "3px 14px 0",
		fontFamily: "'Montserrat', sans-serif",
	},
}));

export default function InputAmount({ id, value, setValue, register, width }) {
	const useWidth = makeStyles(() => ({
		widthProps: {
			width: width,
		}
	}));
	const classWidth = useWidth();
	const classes = useStyles();
	const [campoEmBranco, setCampoEmBranco] = useState(false);
	const { abrirMensagem } = useValidacaoForm();
	const valueRef = useRef();
	const valueLocalStorageRef = useRef();

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
		let valueInput = e.target.value;
		if (isNaN(Number(valueInput.replace(",", ".")))) return;
		if (valueInput.length === 1) {
			valueInput = `00,0${valueInput}`;
		} else if (valueInput) {
			let valueInputArray = valueInput.split(",").join("").split("");
			const cents_1 = valueInputArray[valueInputArray.length - 1] ?? "0";
			const cents_2 = valueInputArray[valueInputArray.length - 2] ?? "0";
			valueInputArray.pop();
			valueInputArray.pop();
			if (valueInputArray.length === 3 && valueInputArray[0] === "0") {
				valueInputArray.shift();
			}
			if (valueInputArray.length === 0) {
				valueInputArray = ["0", "0"];
			} else if (valueInputArray.length === 1) {
				valueInputArray.unshift("0");
			}
			valueInput = `${valueInputArray.join("")},${cents_2}${cents_1}`;
		}
		setValue(valueInput);
	};

	if (value !== undefined) {
		localStorage.setItem(id, valueRef.current);
	}

	return (
		<div className={clsx(classes.margin, classes.root)}>
			<OutlinedInput
				{...register(`${id}`, { value: value })}
				id={id}
				error={campoEmBranco}
				value={value}
				onChange={(e) => handleChange(e)}
				className={clsx(classes.textField, classWidth.widthProps)}
				placeholder="00,00"
				startAdornment={
					<InputAdornment
						position="start"
						className={classes.fontFamily}
						disableTypography
					>
						R$
					</InputAdornment>
				}
			/>
			{campoEmBranco && (
				<FormHelperText className={classes.helperText} error={campoEmBranco}>
					Campo obrigatório
				</FormHelperText>
			)}
		</div>
	);
}
