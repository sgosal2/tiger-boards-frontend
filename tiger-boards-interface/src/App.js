import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "./scss/main.scss";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Toolbar, Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ef6c00"
    },
    secondary: {
      main: "#fdd835"
    }
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
      </div>
    </MuiThemeProvider>
  );
};

export default App;
