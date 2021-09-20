import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    alignSelf: 'center',
    display: 'flex',
    gap: 5,
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  link: {
    color: '#045787',
  },
}));

export default useStyles;

