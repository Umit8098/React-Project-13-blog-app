import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useState } from "react";

import AppRouter from "./router/AppRouter";
import getTheme from "./styles/theme";
import useAuthListener from "./hooks/useAuthListener";

function App() {
  useAuthListener();

  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter mode={mode} toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;