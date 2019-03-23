import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

import "./scss/main.scss";
// import SpaceAvailabilityBoard from "./components/space-availability-board";
import { TigerBoardsAppBar } from "./components/tigerboards-appbar";
import { LoginDialog } from "./components/login-dialog";

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

// Lazy load route components
const spaceAvailabilityBoard = React.lazy(() =>
  import("./components/space-availability-board")
);
const noMatch = React.lazy(() => import("./components/no-match"));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <TigerBoardsAppBar handleLoginClick={() => setShowLogin(true)} />
          <LoginDialog
            isOpen={showLogin}
            handleClose={() => setShowLogin(false)}
          />

          <div id="app-content-section">
            {/* TODO: Change this to get current section title from state */}
            <Typography align="left" variant="h2" id="view-header-text">
              Space Availability
            </Typography>

            <Paper id="app-content">
              {/* TODO: ReactRouter will go here */}
              {/* <SpaceAvailabilityBoard /> */}
              <Suspense fallback={<h1>Loading..</h1>}>
                <Switch>
                  <Route exact path="/" component={spaceAvailabilityBoard} />
                  <Route component={noMatch} />
                </Switch>
              </Suspense>
            </Paper>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
