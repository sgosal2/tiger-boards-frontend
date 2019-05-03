import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import GoogleLogin from "./google-login";

const appBarLinks = [
  {
    to: "/admin/",
    text: "Admin"
  }
];

const formatNavLinks = (navLinks, loggedIn) =>
  navLinks.map(link => {
    return (
      <NavLink
        to={link.to}
        key={link.text}
        activeClassName="nav-link-active"
        className="nav-link"
      >
        <Button color="inherit">{link.text}</Button>
      </NavLink>
    );
  });

export const TigerBoardsAppBar = () => {
  const [loggedIn, changeLoggedIn] = useState(false);

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

        {/* Button cannot be included in appBarLinks because GoogleLogin 
        component is not regular button */}
        <GoogleLogin loggedIn={loggedIn} changeLoggedIn={changeLoggedIn} />
      </Toolbar>
    </AppBar>
  );
};
