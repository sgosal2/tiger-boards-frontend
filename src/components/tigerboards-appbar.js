import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";

export const TigerBoardsAppBar = ({ handleLoginClick }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" align="left" id="appbar-text">
          TigerBoards
        </Typography>
        {/* TODO: Hide Admin if not logged in and user is not admin */}
        <Button color="inherit" onClick={() => alert("Admin page")}>
          Admin
        </Button>
        {/* TODO: Hide Account if not logged in */}
        <Button color="inherit" onClick={() => alert("Account page")}>
          Account
        </Button>
        {/* TODO: Change Login text to Logout if logged in */}
        <Button color="inherit" onClick={() => handleLoginClick()}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
