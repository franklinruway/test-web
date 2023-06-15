import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import store from "./stateManagement/store";
import LoggedInRouting from "./routes/loggedIn/Routing";
import LoggedOutRouting from "./routes/loggedOut/Routing";
import theme from "./theme";
import CssBaseline from '@mui/material/CssBaseline';
import { IntlProvider } from "react-intl";
import { languageWithoutRegionCode, messages } from "./utils/localizer";

function App() {
  return (
    <Provider store={store}>
       <IntlProvider
              locale={languageWithoutRegionCode}
              defaultLocale="es"
              messages={messages}
            >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LoggedOutRouting />
          <LoggedInRouting />
        </ThemeProvider>
      </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
}

export default App;
