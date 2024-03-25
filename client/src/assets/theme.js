import { createTheme } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
const theme = createTheme({
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: teal[300],
    },
    secondary: {
      main: "#f44336",
    },
    buttons: {
      main: "#799496",
    },
    black: {
      main: "#000",
    },
  },
});

export default theme;
