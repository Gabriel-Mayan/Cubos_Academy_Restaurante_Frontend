import { useEffect } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		display: "flex",
	},
	switchBase: {
		padding: 1.75,
		color: "hsla(218, 8%, 80%, 1)",
		"&$checked": {
			transform: "translateX(12px)",
			color: "hsla(152, 83%, 30%, 1)",
			"& + $track": {
				opacity: 1,
				backgroundColor: "hsla(152, 61%, 43%, 0.2)",
				borderColor: "1px solid hsla(152, 83%, 30%, 1)",
			},
		},
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: "none",
	},
	track: {
		border: "1px solid hsla(218, 8%, 80%, 1)",
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: "hsla(216, 24%, 96%, 1)",
	},
	checked: {},
}))(Switch);

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "30.5px",
		zIndex: 1,
	},
	label: {
		margin: "0 0 0 12px",
		color: "hsla(223, 4%, 34%, 1)",
	},
}));

export default function Switches({ id, label, register, value, setValue, unregister }) {
	const classes = useStyles();

	useEffect(() => {
		unregister(`${id}`);
		register(`${id}`, { value });
	}, [value]);

	const handleChange = (event) => {
		setValue(event.target.checked);
	};

	return (
		<div className={classes.root}>
			<AntSwitch checked={value} onChange={handleChange} id={id} />
			<label htmlFor={id} className={classes.label}>
				{label}
			</label>
		</div>
	);
}
