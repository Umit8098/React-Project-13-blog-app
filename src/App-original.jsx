import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import './App.css';
import AppRouter from './router/AppRouter';
import theme from "./styles/theme";
import useAuthListener from "./hooks/useAuthListener";

function App() {

  useAuthListener();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppRouter/>
    </ThemeProvider>
  )
}

export default App;
