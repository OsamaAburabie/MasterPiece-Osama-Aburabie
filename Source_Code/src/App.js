import { ThemeProvider } from "./contexts/themeContext";
import Routes from "./Routes";
import "simplebar/src/simplebar.css";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
