import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import Header from './components/Header';
import AppRoutes from 'config/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: teal[300],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <AppRoutes />
      </ThemeProvider>
    </Router>
  );
}

export default App;
