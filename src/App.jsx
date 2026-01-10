import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import AppRouter from './router/AppRouter';
import theme from "./styles/theme";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppRouter/>
    </ThemeProvider>
  )
}

export default App;
