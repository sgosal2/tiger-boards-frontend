import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import GoogleLogin from "./google-login";
import { UserContext } from "../App";

const appBarLinks = [
  {
    to: "/admin/",
    text: "Admin",
    admin_only: true
  }
];

const formatNavLinks = (navLinks, loggedIn, isAdmin) =>
  navLinks.map(link => {
    console.log(isAdmin);
    return (link.admin_only && isAdmin) || !link.admin_only ? (
      <NavLink
        to={link.to}
        key={link.text}
        activeClassName="nav-link-active"
        className="nav-link"
      >
        <Button color="inherit">{link.text}</Button>
      </NavLink>
    ) : (
      <></>
    );
  });

export const TigerBoardsAppBar = () => {
  const { email, isAdmin } = useContext(UserContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit" align="left" id="appbar-text">
          <NavLink to="/" className="nav-link">
            TigerBoards
          </NavLink>
        </Typography>

        {formatNavLinks(appBarLinks, email, isAdmin)}

        {/* Button cannot be included in appBarLinks because GoogleLogin 
        component is not regular button */}
        <GoogleLogin />
      </Toolbar>
    </AppBar>
  );
};
