import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: "1000px",
      backgroundColor: "hsla(0, 0%, 100%, 1)",
      padding: "64px",
      borderRadius: "16px",
      boxShadow: "0px 4px 16px rgba(50, 50, 50, 0.4)",
      display: "flex",
      flexDirection: "column",
    },
    contained: {
      marginRight: theme.spacing(1),
      borderRadius: "20px",
      boxShadow: "none",
      height: "40px",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: "600",
      fontSize: "14px",
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
    button: {
      marginRight: theme.spacing(1),
      borderRadius: "20px",
      textTransform: "none",
      boxShadow: "none",
      height: "40px",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: "600",
      fontSize: "14px",
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
    buttonsStepper: {
      margin: "auto 0 0 auto",
      display: "flex",
      flexDirection: "row",
    },
  }));