import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	containerInput: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		'& > label': {
			fontSize: 16,
			color: '#393C40',
			marginLeft: 16,
			fontFamily: 'Montserrat',
			fontWeight: '600',
		},
	},
	input: {
		'&>*': {
			height: 47,
		},
	},
}));

export default useStyles;
