import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import AppRoutes from "config/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "context/AppContext";
import theme from "assets/theme";

function App() {
  return (
    <Router>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Header />
          <AppRoutes />
        </ThemeProvider>
      </AppContextProvider>
    </Router>
  );
}

export default App;
