import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import useValidacaoForm from "../../../hooks/useValidacaoForm";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

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
			"&.MuiOutlinedInput-adornedEnd": {
				paddingRight: "24px",
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
		width: "408px",
		"& input": {
			padding: "10px 24px",
		},
	},
	helperText: {
		margin: "3px 14px 0",
		fontFamily: "'Montserrat', sans-serif",
	}
}));

export default function InputPassword({ id, value, setValue, register }) {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
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
		setValue(e.target.value);
	};

	if (value !== undefined) {
		localStorage.setItem(id, valueRef.current);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className={clsx(classes.margin, classes.root)}>
			<div>
				<OutlinedInput
					{...register(`${id}`, { value: value })}
					error={campoEmBranco}
					id={id}
					type={showPassword ? "text" : "password"}
					value={value}
					className={classes.textField}
					onChange={(e) => handleChange(e)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOutlinedIcon />
								) : (
									<VisibilityOffOutlinedIcon />
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
				{campoEmBranco && (
					<FormHelperText className={classes.helperText} error={campoEmBranco}>
						Campo obrigatório
					</FormHelperText>
				)}
			</div>
		</div>
	);
}
