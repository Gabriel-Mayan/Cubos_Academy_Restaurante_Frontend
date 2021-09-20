import { makeStyles } from '@material-ui/styles';
import BackgroundLogin from '../../assets/bg-login.png';

const useStyles = makeStyles((theme) => ({
  containerLogin: {
    backgroundImage: `url(${BackgroundLogin})`,
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  illustrationLogin: {
    height: '80%',
    zIndex: 1,
    marginLeft: '15.15%',
  },
  root: {
    width: 488,
    zIndex: 2,
    position: 'absolute',
    left: '22.2%',
    boxSizing: 'border-box',
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 40,
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
  },
  loginTitle: {
    fontSize: 32,
    fontFamily: "'Baloo 2', cursive",
    color: '#D13201',
    fontWeight: 700,
  },
  form: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 49,
    '& > *': {
      width: '50ch',
      padding: 0,
    },
  },
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
  botao: {
    all: 'unset',
    cursor: 'pointer',
    padding: '12px 40px',
    borderRadius: 25,
    backgroundColor: '#D13201',
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    textTransform: 'capitalize',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#FB3B00',
    },
  },
  backdrop: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'grid',
    placeContent: 'center',
  },
  noBackdrop: {
    display: 'none',
  },
}));

export default useStyles;
