import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

import "./scss/main.scss";
// import SpaceAvailabilityBoard from "./components/space-availability-board";
import { TigerBoardsAppBar } from "./components/tigerboards-appbar";
import { LoginDialog } from "./components/login-dialog";
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

// Lazy load route components
const spaceAvailabilityBoard = React.lazy(() =>
  import("./components/space-availability-board")
);
const adminView = React.lazy(() => import("./components/admin-view"));
const noMatch = React.lazy(() => import("./components/no-match"));
const editBuilding = React.lazy(() => import("./components/edit-building"));
const editSpace = React.lazy(() => import("./components/edit-space"));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);

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
            <Header />

            <Paper id="app-content">
              <Suspense fallback={<h1>Loading..</h1>}>
                <Switch>
                  <Route exact path="/" component={spaceAvailabilityBoard} />
                  <Route exact path="/admin/" component={adminView} />
                  <Route
                    path="/admin/editbuilding/:name"
                    component={editBuilding}
                  />
                  <Route path="/admin/editspace/:name" component={editSpace} />
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
