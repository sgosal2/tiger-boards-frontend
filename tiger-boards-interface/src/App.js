import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Toolbar, Typography, Paper } from "@material-ui/core";

import "./scss/main.scss";
import SpaceAvailabilityBoard from "./components/space-availability-board";

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

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              TigerBoards
            </Typography>
          </Toolbar>
        </AppBar>

        <div id="app-content-section">
          {/* TODO: Change this to get current section title from state */}
          <Typography align="left" variant="h2" id="view-header-text">
            Space Availability
          </Typography>

          <Paper id="app-content">
            {/* TODO: ReactRouter will go here */}
            <SpaceAvailabilityBoard />
          </Paper>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
