import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			margin: theme.spacing(2),
		},
		margin: "50px"
	},
	circularProgress: {
		color: "hsla(14, 99%, 41%, 1)",
	}
}));

export default function CircularIndeterminate() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress className={classes.circularProgress} />
		</div>
	);
}
