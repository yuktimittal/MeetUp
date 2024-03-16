import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Header from './components/Header';
import AppRoutes from 'config/Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from 'context/AppContext';

function App() {
  const theme = createTheme({
    typography: {
      "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
    palette: {
      primary: {
        main: teal[300],
      },
      secondary: {
        main: '#f44336',
      },
      buttons: {
        main: '#799496',
      },
      black: {
        main: '#000',
      },
    },
  });
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
