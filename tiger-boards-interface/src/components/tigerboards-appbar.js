import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const appBarLinks = [
  {
    to: "/admin/",
    text: "Admin"
  },
  {
    to: "/account/",
    text: "Account"
  }
];

const formatNavLinks = navLinks =>
  navLinks.map(link => {
    return (
      <NavLink
        to={link.to}
        activeClassName="nav-link-active"
        className="nav-link"
      >
        <Button color="inherit">{link.text}</Button>
      </NavLink>
    );
  });

export const TigerBoardsAppBar = ({ handleLoginClick }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" align="left" id="appbar-text">
          <NavLink to="/" className="nav-link">
            TigerBoards
          </NavLink>
        </Typography>

        {/* TODO: Hide Admin if not logged in and user is not admin */}
        {/* TODO: Hide Account if not logged in */}
        {formatNavLinks(appBarLinks)}

        {/* TODO: Change Login text to Logout if logged in */}
        <Button color="inherit" onClick={() => handleLoginClick()}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
