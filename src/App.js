import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import "./scss/main.scss";
import { TigerBoardsAppBar } from "./components/tigerboards-appbar";
import Header from "./components/header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ef6c00"
    },
    secondary: {
      main: "#fdd835"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export const UserContext = React.createContext();

// Lazy load route components
const spaceAvailabilityBoard = React.lazy(() =>
  import("./components/space-availability/space-availability-board")
);
const adminView = React.lazy(() =>
  import("./components/admin-view/admin-view")
);
const noMatch = React.lazy(() => import("./components/no-match"));

const App = () => {
  const [userEmail, changeUserEmail] = useState(null);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <UserContext.Provider
            value={{
              email: userEmail,
              changeUserEmail: email => changeUserEmail(email)
            }}
          >
            <TigerBoardsAppBar />

            <div id="app-content-section">
              <Header />

              <Paper id="app-content">
                <Suspense fallback={<h1>Loading..</h1>}>
                  <Switch>
                    <Route exact path="/" component={spaceAvailabilityBoard} />
                    <Route path="/admin/" component={adminView} />
                    <Route component={noMatch} />
                  </Switch>
                </Suspense>
              </Paper>
            </div>
          </UserContext.Provider>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
