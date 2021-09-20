import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";

import CircularProgress from "../CircularProgress";
import useValidacaoForm from "../../../hooks/useValidacaoForm";

import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

const useColorlibStepIconStyles = makeStyles({
	root: {
		backgroundColor: "hsla(218, 8%, 80%, 1)",
		zIndex: 1,
		color: "hsla(214, 6%, 24%, 1)",
		width: 32,
		height: 32,
		display: "flex",
		borderRadius: "50%",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: "600",
	},
	active: {
		backgroundColor: "hsla(14, 99%, 41%, 0.2)",
		color: "hsla(14, 99%, 41%, 1)",
	},
	completed: {
		backgroundColor: "hsla(152, 100%, 19%, 0.2)",
		color: "hsla(152, 100%, 19%, 1)",
	},
});

function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;

	const icons = {
		1: "",
		2: 1,
		3: 2,
		4: 3,
	};

	return (
		<div
			className={clsx(classes.root, {
				[classes.active]: active,
				[classes.completed]: completed,
			})}
		>
			{icons[String(props.icon)]}
		</div>
	);
}

ColorlibStepIcon.propTypes = {
	active: PropTypes.bool,
	completed: PropTypes.bool,
	icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	button: {
		marginRight: theme.spacing(1),
		borderRadius: "20px",
		textTransform: "capitalize",
		boxShadow: "none",
		height: "40px",
		fontFamily: "'Montserrat', sans-serif",
		fontWeight: "600",
		fontSize: "14px",
	},
	contained: {
		color: "hsla(0, 0%, 100%, 1)",
		backgroundColor: "hsla(14, 99%, 41%, 1)",
		paddingLeft: "40px",
		paddingRight: "40px",
		"&:hover": {
			backgroundColor: "hsla(14, 84%, 36%, 1)",
			boxShadow: "none",
		},
		"&:disabled": {
			backgroundColor: "hsla(218, 8%, 80%, 1)",
			color: "hsla(210, 3%, 45%, 1)",
		},
	},
	text: {
		color: "hsla(14, 99%, 41%, 1)",
		"&:hover": {
			color: "hsla(14, 84%, 36%, 1)",
			boxShadow: "none",
			background: "none",
		},
		"&:disabled": {
			color: "hsla(218, 8%, 80%, 1)",
		},
	},
	stepper: {
		padding: 0,
		height: "32px",
		marginBottom: "65px",
	},
	buttonsStepper: {
		margin: "40px auto 49px",
	},
}));

function getSteps() {
	return ["1", "2", "3"];
}

export default function Steppers({ titulo, formsPassos, statusCarregamento }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(1);
	const steps = getSteps();
	const { erro, setAbrirMensagem, mensagem } = useValidacaoForm();

	function getStepContent(step) {
		switch (step) {
			case 0:
				return "";
			case 1:
				return formsPassos[0];
			case 2:
				return formsPassos[1];
			case 3:
				return formsPassos[2];
			case 4:
				return (statusCarregamento ? <CircularProgress /> : mensagem.texto);
			default:
				return "Unknown step";
		}
	}

	const handleNext = () => {
		if (erro) {
			return setAbrirMensagem(true);
		} else {
			setAbrirMensagem(false);
		}

		if (activeStep > steps.length) return;

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setAbrirMensagem(false);
	};

	return (
		<div className={classes.root}>
			<Stepper
				activeStep={activeStep}
				connector={""}
				className={classes.stepper}
			>
				<h1>{titulo}</h1>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel StepIconComponent={ColorlibStepIcon} />
					</Step>
				))}
			</Stepper>
			<div className="conteudoForm">
				<form>{getStepContent(activeStep)}</form>
				<div className={classes.buttonsStepper}>
					<Button
						disabled={activeStep === 1}
						onClick={handleBack}
						className={clsx(classes.button, classes.text)}
					>
						Anterior
					</Button>
					<Button
						type={activeStep === steps.length + 1 ? "submit" : "button"}
						variant="contained"
						onClick={(e) => handleNext(e)}
						className={clsx(classes.button, classes.contained)}
					>
						{activeStep >= steps.length ? "Criar conta" : "Próximo"}
					</Button>
				</div>
			</div>
		</div>
	);
}
